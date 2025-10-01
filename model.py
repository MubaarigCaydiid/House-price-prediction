
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
from utils import prepare_features_from_raw


# 1) Load the cleaned dataset


df = pd.read_csv("clean_house_l5_dataset.csv")


# 2) Split features (X) and target (y)

X = df.drop(columns=["Price", "LogPrice"])
y = df["Price"]


# 3) Train/test split 80% train 20% test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


# 4) Train Linear Regression
lr = LinearRegression()
lr.fit(X_train, y_train)
lr_pred = lr.predict(X_test)


# 5) Train Random Forest

rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
rf_pred = rf.predict(X_test)

# metrics
def print_metrics(name, y_true, y_pred):
    """Print R², MAE, MSE, RMSE for a model's predictions."""
    r2  = r2_score(y_true, y_pred)
    mae = mean_absolute_error(y_true, y_pred)
    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    print(f"\n{name} Performance:")
    print(f"  R²   : {r2:.3f}")          
    print(f"  MAE  : {mae:,.0f}")        
    print(f"  MSE  : {mse:,.0f}")        
    print(f"  RMSE : {rmse:,.0f}")      


print_metrics("Linear Regression", y_test, lr_pred)
print_metrics("Random Forest",   y_test, rf_pred)


# 7) Single-row prediction (sanity check)

i = 3
x_one_df = X_test.iloc[[i]]   
y_true   = y_test.iloc[i]     

p_lr_one = float(lr.predict(x_one_df)[0])
p_rf_one = float(rf.predict(x_one_df)[0])

print("\nSingle-row sanity check:")
print(f"  Actual Price: ${y_true:,.0f}")
print(f"  LR Pred     : ${p_lr_one:,.0f}")
print(f"  RF Pred     : ${p_rf_one:,.0f}")



joblib.dump(lr, "models/lr_model.joblib")
joblib.dump(rf, "models/rf_model.joblib")
print("\nModels saved to models")