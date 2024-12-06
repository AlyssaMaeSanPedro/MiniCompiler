function updateButtonStates(states) {
    const buttons = {
        openFile: document.getElementById("openFile"),
        lexicalBtn: document.getElementById("lexicalBtn"),
        syntaxBtn: document.getElementById("syntaxBtn"),
        semanticBtn: document.getElementById("semanticBtn"),
        clearBtn: document.getElementById("clearBtn"),
    };

    Object.keys(states).forEach((key) => {
        const button = buttons[key];
        button.disabled = states[key];
        button.style.backgroundColor = states[key] ? "grey" : "";
        button.style.cursor = states[key] ? "not-allowed" : "pointer"; });
    }
        updateButtonStates({
            openFile: false,
            lexicalBtn: true,
            syntaxBtn: true,
            semanticBtn: true,
            clearBtn: true,
        });

function displayMessage(message, backgroundColor) {
    const result = document.getElementById("result");
    result.value = message;
    result.style.backgroundColor = backgroundColor;
}

// Open File button
document.getElementById("openFile").addEventListener("click", function () {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt, .java";

    fileInput.click();

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("codeInput").value = e.target.result;

                updateButtonStates({
                    openFile: true,
                    lexicalBtn: false,
                    syntaxBtn: true,
                    semanticBtn: true,
                    clearBtn: true,
                });
            };
            reader.readAsText(file);
        }
    });
});

// Lexical Analysis
let tokens = [];
let lexemesArray = [];
document.getElementById("lexicalBtn").addEventListener("click", function () {
    const code = document.getElementById("codeInput").value.trim();
    const result = performLexicalAnalysis(code);
    
    tokens = result.tokens;
    lexemesArray = result.lexemesArray;
});

// Syntax Analysis
document.getElementById("syntaxBtn").addEventListener("click", function () {
    performSyntaxAnalysis(tokens);
});

// Semantic Analysis
document.getElementById("semanticBtn").addEventListener("click", function () {
    performSemanticAnalysis(lexemesArray);
});


// Clear button
document.getElementById("clearBtn").addEventListener("click", function () {
    document.getElementById("codeInput").value = "";
    document.getElementById("result").value = "";
    document.getElementById("result").style.backgroundColor = "white";
    document.getElementById("openFile").disabled = false;
    updateButtonStates({
        openFile: false,
        lexicalBtn: true,
        syntaxBtn: true,
        semanticBtn: true,
        clearBtn: true,
    });
});