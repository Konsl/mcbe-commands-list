const bedrock = require('bedrock-protocol');
const fs = require('fs');
const client = bedrock.createClient({
    host: 'localhost',
    port: 19132,
    username: 'mcpe-commands-list',
    offline: true
});

client.on('available_commands', (packet) => {
    let cmds = packet;
    cmds.enum_constraints = undefined;
    cmds.values_len = undefined;
    cmds._enum_type = undefined;
    cmds.command_data.forEach((cmd) => {
        cmd.overloads.forEach((overload) => {
            overload.forEach((parameter) => {
                if (parameter.enum_type) {
                    if (parameter.enum_type == "valid")
                        parameter.enum_type = 16;
                    if (parameter.enum_type == "enum")
                        parameter.enum_type = 32;
                    if (parameter.enum_type == "suffixed")
                        parameter.enum_type = 256;
                    if (parameter.enum_type == "soft_enum")
                        parameter.enum_type = 1024;
                }
            });
        });
    });
    fs.writeFile("commands.json", JSON.stringify(packet, null, 4), function (err) {
        if (err) return console.log(err);
        client.close();
    });
});