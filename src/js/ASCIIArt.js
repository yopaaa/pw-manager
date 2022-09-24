import figlet from 'figlet'

const LogASCIIText = (text) => {
    const config = {
        font: 'Big Money-ne',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }

    figlet.text(text, config, (err, data) => {
        if (err) console.log(err);
        console.log(data);
        console.log(`server is running on http://${process.env.MAIN_HOST}:${process.env.MAIN_PORT}`);
    });
}

export default LogASCIIText;
