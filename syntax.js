function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

function performSyntaxAnalysis(tokens) {
    let isValidSyntax = true;

    const initialization_grammar = ["<data_type>", "<identifier>", "<assignment_operator>", "<value>", "<delimiter>"];
    const declaration_grammar = ["<data_type>", "<identifier>", "<delimiter>"];
    const assignment_grammar = ["<identifier>", "<assignment_operator>", "<value>", "<delimiter>"];

    for (let i = 0; i < tokens.length; i++) {
        const statement1 = tokens.slice(i, i + 5);
        const statement2 = tokens.slice(i, i + 3);
        const statement3 = tokens.slice(i, i + 4);

        if (arraysEqual(statement1, initialization_grammar)) {
            i += 4;
        } else if (arraysEqual(statement2, declaration_grammar)) {
            i += 2;
        } else if (arraysEqual(statement3, assignment_grammar)) {
            i += 3;
        } else {
            isValidSyntax = false;
            break;
        }
    }

    if (isValidSyntax) {
        displayMessage("Syntax analysis passed! No errors.", "lightgreen");
        updateButtonStates({
            openFile: true,
            lexicalBtn: true,
            syntaxBtn: true,
            semanticBtn: false,
            clearBtn: true,
        });
    } else {
        displayMessage("Syntax analysis failed! Syntax error found.", "lightcoral");
        updateButtonStates({
            openFile: true,
            lexicalBtn: true,
            syntaxBtn: true,
            semanticBtn: true,
            clearBtn: false,
        });
    }
}