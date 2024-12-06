function performSemanticAnalysis(lexemesArray) {
    const errors = [];
    const variableDeclarations = new Map();
    const primitiveTypes = ["int", "byte", "short", "long", "double", "float", "boolean", "String", "char"];

    for (let i = 0; i < lexemesArray.length; i++) {
        const lexeme = lexemesArray[i];

        if (primitiveTypes.includes(lexeme) && i + 1 < lexemesArray.length) {
            const dataType = lexeme;
            const variableName = lexemesArray[i + 1];

            if (variableDeclarations.has(variableName)) {
                errors.push(`Duplicate declaration of variable: ${variableName}`);
            } else {
                variableDeclarations.set(variableName, dataType);
            }

            i++;
        }
        if (lexeme === "=" && i - 1 >= 0 && i + 1 < lexemesArray.length) {
            const variableName = lexemesArray[i - 1];
            const assignedValue = lexemesArray[i + 1];
            const dataType = variableDeclarations.get(variableName);

            if (!dataType) {
                errors.push(`Undeclared variable used: ${variableName}`);
            } else {
                if (
                    (dataType === "int" && !/^-?\d+$/.test(assignedValue)) ||
                    (dataType === "boolean" && !["true", "false"].includes(assignedValue)) ||
                    (dataType === "String" && !/^["'][^"']*["']$/.test(assignedValue)) ||
                    (dataType === "char" && !(assignedValue.length === 3 && /^['"][^'"]['"]$/.test(assignedValue))) ||
                    (dataType === "double" && isNaN(parseFloat(assignedValue))) ||
                    (dataType === "long" && (!/^-?\d+$/.test(assignedValue) || BigInt(assignedValue) > BigInt("9223372036854775807") || BigInt(assignedValue) < BigInt("-9223372036854775808"))) ||
                    (dataType === "short" && (!/^-?\d+$/.test(assignedValue) || parseInt(assignedValue) > 32767 || parseInt(assignedValue) < -32768)) ||
                    (dataType === "float" && isNaN(parseFloat(assignedValue))) ||
                    (dataType === "byte" && (!/^-?\d+$/.test(assignedValue) || parseInt(assignedValue) > 127 || parseInt(assignedValue) < -128))
                ) {
                    errors.push(`Incompatible type assignment to ${variableName}: ${assignedValue}`);
                }
            }

            i++;
        }
    }

    console.log("Semantic Analysis Errors:");
    console.log(`${errors.join("\n")}`);

    if (errors.length === 0) {
        displayMessage("Semantic analysis passed! No errors.", "lightgreen");
        updateButtonStates({
            openFile: true,
            lexicalBtn: true,
            syntaxBtn: true,
            semanticBtn: true,
            clearBtn: false,
        });
    } else {
        displayMessage(
            "Semantic analysis failed! Errors found:",
            "lightcoral"
        );
        updateButtonStates({
            openFile: true,
            lexicalBtn: true,
            syntaxBtn: true,
            semanticBtn: true,
            clearBtn: false,
        });
    }
}
