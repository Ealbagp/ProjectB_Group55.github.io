import pandas as pd
import matplotlib.pyplot as plt

# Caricamento e preparazione dati
df = pd.read_csv("NYC EH Data Portal - Fine particles (PM 2.5) (full table).csv")
df = df[df["Geography"] == "New York City"]
df["TimePeriod"] = pd.to_numeric(df["TimePeriod"], errors="coerce")
df["Annual mean mcg/m3"] = pd.to_numeric(df["Annual mean mcg/m3"], errors="coerce")
df = df.dropna(subset=["TimePeriod", "Annual mean mcg/m3"])
df = df.sort_values("TimePeriod")

# Plotting con matplotlib
plt.figure(figsize=(12, 6))
plt.plot(df["TimePeriod"], df["Annual mean mcg/m3"], color='navy', label="NYC")
plt.scatter(df["TimePeriod"], df["Annual mean mcg/m3"], color='navy', edgecolor='white', zorder=3)

# Eventi speciali
highlight_events = {
    2014: ("Air Pollution Control Code", "red"),
    2017: ("Clean Heat Program", "green"),
    "2017b": ("Clean Heavy-Duty Bus and Truck Rule", "orange"),
    2020: ("Covid 19", "purple"),
}

for key, (label, color) in highlight_events.items():
    year = int(str(key).replace("b", ""))
    value = df[df["TimePeriod"] == year]["Annual mean mcg/m3"]
    if not value.empty:
        if key == 2017:
            plt.scatter(year, value.values[0], s=140, color="green", label="Clean Heat Program", zorder=4)
        elif key == "2017b":
            plt.scatter(year, value.values[0], s=100, color="orange", label="Clean Heavy-Duty Bus and Truck Rule", zorder=5)
        else:
            plt.scatter(year, value.values[0], s=100, color=color, label=label, zorder=4)

plt.title("PM2.5 Annual Average - New York City")
plt.xlabel("Year")
plt.ylabel("PM2.5 (µg/m³)")
plt.legend(loc="upper right")
plt.grid(True)
plt.tight_layout()
plt.show()
