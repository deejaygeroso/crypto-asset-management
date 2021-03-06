import { toast } from 'react-toastify';

/* ----------------------------------------------------------------------------------
 * Generate toaster success message 
 * -------------------------------------------------------------------------------- */
export const toasterSuccessMessage = (message) => {
    toast(message, {
        position: toast.POSITION.BOTTOM_LEFT,
        className: 'toaster-background-success',
        bodyClassName: 'toaster-body',
        progressClassName: 'toaster-progress-success',
    });
}

/* ----------------------------------------------------------------------------------
 * Generate toaster Error message 
 * -------------------------------------------------------------------------------- */
export const toasterErrorMessage = (message) => {
    toast(message, {
        position: toast.POSITION.BOTTOM_LEFT,
        className: 'toaster-background-error',
        bodyClassName: 'toaster-body',
        progressClassName: 'toaster-progress-error',
    });
}

/* ----------------------------------------------------------------------------------
 * if price is more than $1 then only add two decimal but 4 if less than $1 
 * -------------------------------------------------------------------------------- */
export const formatPrice = (inputPrice) => {
    let price = parseFloat(inputPrice);
    if (price >= 1) {
        return formatMoney(price);
    }
    return price.toFixed(4);
}

/* ----------------------------------------------------------------------------------
 * This is an alternative for formatMoney which
 * returns the amount with commas with 2 decimal point
 * -------------------------------------------------------------------------------- */
export const formatMoney = (input) => {
    var parts = parseFloat(input).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

/* ----------------------------------------------------------------------------------
 * Format money with commas but rounds the decimal value to .00
 * I dont think I'll be using this anymore
 * -------------------------------------------------------------------------------- */
export const formatMoneyRounded = (input, n, x, s, c) => {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = parseInt(input).toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

/* ----------------------------------------------------------------------------------
 * Converts money to "k", "M", "B" and "T"
 * -------------------------------------------------------------------------------- */
export const commarize = (inputValue) => {
  let input = parseFloat(inputValue);
  if (input >= 1e3) {
    var units = [" k", " M", " B", " T"];

    // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
    let unit = Math.floor(((input).toFixed(0).length - 1) / 3) * 3
    // Calculate the remainder
    var num = (input / ('1e'+unit)).toFixed(2)
    var unitname = units[Math.floor(unit / 3) - 1]

    // output number remainder + unitname
    return num + unitname
  }

  // return formatted original number
  // return input.toLocaleString()
  return input.toFixed(2);
}
