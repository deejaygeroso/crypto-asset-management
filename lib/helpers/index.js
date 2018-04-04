export const formatMoney = (input, n, x, s, c) => {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = parseInt(input).toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

export const commarize = (inputValue) => {
  let input = parseInt(inputValue);
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
  return input.toLocaleString()
}
