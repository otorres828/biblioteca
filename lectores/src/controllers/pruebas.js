
module.exports = function(io) {
    var SerialPort = require("serialport");
  
    const port = new SerialPort(
        'COM4',
        {baudRate: 9600}
    ) 
    const parser = new SerialPort.parsers.Readline()
    port.pipe(parser)
    
    parser.on('data', (data)=>{
        console.log(data)
        if (data.includes('"Card"') && data.includes('"UID"') && data.includes('"iCardCode"') && data.includes('"iSiteCode"') && data.includes('"iCode"')) {
            port.write('ok\n')
        }
    })
  };
  