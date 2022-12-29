document.querySelector('#unminify').addEventListener('click', () => unminify());
document.querySelector('#copy').addEventListener('click', () => copyUnminify());
document.querySelector('#clear').addEventListener('click', () => eraseText());

function isCss(a) {
    if (/\w+\s*?\{[\s\S]+?\}/.test(a) && !/<(style).*?>[\s\S]+?<\/\1>/.test(a)) {
        return true;
    }
}

function isJs(a) {
    if ((/function\s*?\w+\s*?\(.*?\)\s*?\{[\s\S]+?\}/.test(a) || /var\s*?\w+\s*?\=/.test(a)) && !/<(script).*?>[\s\S]+?<\/\1>/.test(a)) {
        return true;
    }
}

function isHtml(a) {
    if (/<(\w+).*?>[\s\S]+?<\/\1>/.test(a)) {
        return true;
    }
}

function unminify() {
    let a = document.getElementById('textarea').value;

    if (isCss(a) && !isJs(a)) {
        console.log('Css');
        a = css_beautify(a);
    } else if (isJs(a)) {
        console.log('Js');
        a = js_beautify(a);
    } else if (isHtml(a)) {
        console.log('Html');
        a = html_beautify(a);
    } else {
        a = html_beautify(a);
    }

    document.getElementById('textarea').value = a;
    document.querySelector('#textarea').style.color = "#34495e";
}

function copyUnminify() {
    let a = document.querySelector('#textarea');
    a.select();
    try {
        let b = document.execCommand('copy');
        let c = b ? 'Success' : 'Unsuccess';
        window.getSelection().empty();
        document.querySelector('#copy').innerText = 'Copied';

        setTimeout(() => {
            document.querySelector('#copy').innerText = 'Copy';
        }, 1000);
    } catch (err) {
        alert('Oops, unable to copy !');
    }
}

function eraseText() {
    document.getElementById("textarea").value = "";
}
