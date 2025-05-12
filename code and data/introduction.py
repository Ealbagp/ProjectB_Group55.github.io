import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("NYC EH Data Portal - Fine particles (PM 2.5) (full table).csv")

df = df[df["GeoType"] == "Borough"]

df = df[["TimePeriod", "Geography", "Annual mean mcg/m3"]]

df["TimePeriod"] = pd.to_numeric(df["TimePeriod"], errors="coerce").astype("Int64")
df["Annual mean mcg/m3"] = pd.to_numeric(df["Annual mean mcg/m3"], errors="coerce")

df_pivot = df.pivot(index="TimePeriod", columns="Geography", values="Annual mean mcg/m3")

plt.figure(figsize=(20, 10))
for borough in df_pivot.columns:
    plt.plot(df_pivot.index, df_pivot[borough], marker="o", label=borough)

plt.title("PM2.5 Annual Average (µg/m³) by District")
plt.xlabel("Year")
plt.ylabel("Annual Mean PM2.5 (µg/m³)")
plt.grid(True)
plt.legend(title="District")
plt.tight_layout()
plt.show()
