export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getIEVersion() {
  let rv = -1
  var ua = navigator.userAgent
  if (navigator.appName === 'Microsoft Internet Explorer') {
    var oldIeRegex = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})')
    if (oldIeRegex.exec(ua) != null) {
      rv = parseFloat(RegExp.$1)
    }
  } else if (navigator.appName === 'Netscape') {
    var newIeRegex = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})')
    if (newIeRegex.exec(ua) != null) {
      rv = parseFloat(RegExp.$1)
    }
  }
  return rv
}
