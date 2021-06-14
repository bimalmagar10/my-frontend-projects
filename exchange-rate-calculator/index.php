

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Excahnge Rate Calculator</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<h1>Exchange Rate Calculator</h1>
	<p>Choose the currency and amounts ot get the exchange rate.</p>
	<div class="container">
		<div class="currency">
			<select name="bimal" id="currency-one">
				<option value="AED">AED</option>
				<option value="ARS">ARS</option>
				<option value="AUD">AUD</option>
				<option value="BGN">BGN</option>
				<option value="BRL">BRL</option>
				<option value="BSD">BSD</option>
				<option value="CAD">CAD</option>
				<option value="CHF">CHF</option>
				<option value="CLP">CLP</option>
				<option value="CNY">CNY</option>
				<option value="COP">COP</option>
				<option value="CZK">CZK</option>
				<option value="DKK">DKK</option>
				<option value="DOP">DOP</option>
				<option value="EGP">EGP</option>
				<option value="EUR">EUR</option>
				<option value="USD" selected>USD</option>
				<option value="ZAR">ZAR</option>
				<input type="number" name="" id="amount-one" placeholder="0" value="1">
			</select>
			<div class="swap-rate-container">
				<button class="btn" id="swap">
					Swap
				</button>
				<div class="rate" id="rate"></div>
			</div>
			<select name="" id="currency-two">
				<option value="AED">AED</option>
				<option value="ARS">ARS</option>
				<option value="AUD">AUD</option>
				<option value="BGN">BGN</option>
				<option value="BRL">BRL</option>
				<option value="BSD">BSD</option>
				<option value="CAD">CAD</option>
				<option value="CHF">CHF</option>
				<option value="CLP">CLP</option>
				<option value="CNY">CNY</option>
				<option value="COP">COP</option>
				<option value="CZK">CZK</option>
				<option value="DKK">DKK</option>
				<option value="DOP">DOP</option>
				<option value="EGP">EGP</option>
				<option value="EUR" selected>EUR</option>
				<option value="USD">USD</option>
				<option value="ZAR">ZAR</option>
				<input type="number" name="" id="amount-two" placeholder="0" value="1">
			</select>
		</div>
	</div>
	<script src="script.js"></script>
</body>
</html>