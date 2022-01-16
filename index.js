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
                if (parameter.value_type) {
                    if (parameter.value_type == "int")
                        parameter.value_type = 1;
                    if (parameter.value_type == "float")
                        parameter.value_type = 2;
                    if (parameter.value_type == "value")
                        parameter.value_type = 3;
                    if (parameter.value_type == "wildcard_int")
                        parameter.value_type = 4;
                    if (parameter.value_type == "operator")
                        parameter.value_type = 5;
                    if (parameter.value_type == "target")
                        parameter.value_type = 6;
                    if (parameter.value_type == "file_path")
                        parameter.value_type = 16;
                    if (parameter.value_type == "string")
                        parameter.value_type = 32;
                    if (parameter.value_type == "position")
                        parameter.value_type = 40;
                    if (parameter.value_type == "message")
                        parameter.value_type = 44;
                    if (parameter.value_type == "raw_text")
                        parameter.value_type = 46;
                    if (parameter.value_type == "json")
                        parameter.value_type = 50;
                    if (parameter.value_type == "command")
                        parameter.value_type = 63;
                }
            });
        });
    });
    fs.writeFile("commands.json", JSON.stringify(packet, null, 4), function (err) {
        if (err) return console.log(err);
        client.close();
    });
});