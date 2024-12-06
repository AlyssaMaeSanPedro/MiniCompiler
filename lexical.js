const dataTypes = ["int", "byte", "short", "long", "double", "float", "boolean", "String", "char"];
const assignmentOperator = "=";
const delimiters = [";"];
const booleanValues = ["true", "false"];

function splitLexeme(lexeme) {
    const delimiterRegex = new RegExp(`[${delimiters.join("")}]`);
    const trimmedLexeme = lexeme.trim();

    if (delimiterRegex.test(trimmedLexeme)) {
        const delimiterIndex = trimmedLexeme.search(delimiterRegex);

        if (delimiterIndex > 0) {
            return [
                trimmedLexeme.slice(0, delimiterIndex),
                trimmedLexeme.slice(delimiterIndex)
            ];
        } else {
            return [trimmedLexeme];
        }
    }

    return [trimmedLexeme];
}

function performLexicalAnalysis(code) {
    const tokens = [];
    const lexemesArray = [];
    const lexemes = code.split(/\s+/);

    lexemes.forEach((lexeme) => {
        let splitParts = splitLexeme(lexeme);

        splitParts.forEach((part) => {
            lexemesArray.push(part);

            if (dataTypes.includes(part)) {
                tokens.push("<data_type>");

            } else if (/^[a-zA-Z_]\w*$/.test(part) && 
                        !dataTypes.includes(part) && 
                        !booleanValues.includes(part)) {
                tokens.push("<identifier>");

            } else if (part === assignmentOperator) {
                tokens.push("<assignment_operator>");

            } else if (/^-?\d+(\.\d+)?$/.test(part) || 
                        /^["'][^"']*["']$/.test(part) || 
                        booleanValues.includes(part)) {
                tokens.push("<value>");

            } else if (delimiters.includes(part)) {
                tokens.push("<delimiter>");
                
            } else {
                tokens.push("<invalid>");
            }
        });
    });

    const lexicalError = tokens.some((t) => t === "<invalid>");

    console.log("Lexical Analysis Results:");
    lexemesArray.forEach((lexeme, index) => {
        console.log(`Lexeme: '${lexeme}', Token: ${tokens[index]}`);
    });

    if (lexicalError) {
        displayMessage(
            "Lexical analysis failed! Invalid characters found.",
            "lightcoral"
        );
        
        updateButtonStates({
            openFile: true,
            lexicalBtn: true,
            syntaxBtn: true,
            semanticBtn: true,
            clearBtn: false,
        });

    } else {
        displayMessage(
            "Lexical analysis passed! No errors.",
            "lightgreen"
        );
        
        updateButtonStates({
            openFile: true,
            lexicalBtn: true,
            syntaxBtn: false,
            semanticBtn: true,
            clearBtn: true,
        });
    }

    return { tokens, lexemesArray };
}