const express = require("express");

const mobileRouter = express.Router();

const shortcutTips = [
  {
    shortDescription: "Duplicate the current line",
    editorsUsing: ["VS Code", "Sublime Text", "Atom", "Vim", "WebStorm"],
    shortcut: "Ctrl + D",
    howToRemember: "Think of 'D' for 'Duplicate'.",
  },
  {
    shortDescription: "Save the current file",
    editorsUsing: [
      "VS Code",
      "IntelliJ IDEA",
      "Notepad++",
      "Atom",
      "Sublime Text",
    ],
    shortcut: "Ctrl + S",
    howToRemember: "'S' for 'Save'—super simple!",
  },
  {
    shortDescription: "Undo the last action",
    editorsUsing: [
      "VS Code",
      "Sublime Text",
      "IntelliJ IDEA",
      "Brackets",
      "WebStorm",
    ],
    shortcut: "Ctrl + Z",
    howToRemember: "‘Z’ like rewinding time.",
  },
  {
    shortDescription: "Redo the last undone action",
    editorsUsing: ["VS Code", "WebStorm", "Vim", "Notepad++", "Atom"],
    shortcut: "Ctrl + Y",
    howToRemember: "'Y' sounds like 'Yes, do it again!'",
  },
  {
    shortDescription: "Find a word or phrase",
    editorsUsing: [
      "IntelliJ IDEA",
      "VS Code",
      "Sublime Text",
      "Brackets",
      "Notepad++",
    ],
    shortcut: "Ctrl + F",
    howToRemember: "'F' for 'Find'.",
  },
  {
    shortDescription: "Replace text",
    editorsUsing: ["VS Code", "Atom", "Vim", "WebStorm", "Brackets"],
    shortcut: "Ctrl + H",
    howToRemember: "'H' for 'Hunt and replace'.",
  },
  {
    shortDescription: "Select all text in the file",
    editorsUsing: ["VS Code", "Sublime Text", "IntelliJ IDEA", "Vim", "Atom"],
    shortcut: "Ctrl + A",
    howToRemember: "'A' for 'All'.",
  },
  {
    shortDescription: "Cut the selected text",
    editorsUsing: ["Sublime Text", "Atom", "VS Code", "Brackets", "Notepad++"],
    shortcut: "Ctrl + X",
    howToRemember: "'X' looks like scissors.",
  },
  {
    shortDescription: "Copy the selected text",
    editorsUsing: ["VS Code", "WebStorm", "Sublime Text", "Notepad++", "Vim"],
    shortcut: "Ctrl + C",
    howToRemember: "'C' for 'Copy'.",
  },
  {
    shortDescription: "Paste the copied text",
    editorsUsing: ["VS Code", "Atom", "Sublime Text", "Vim", "IntelliJ IDEA"],
    shortcut: "Ctrl + V",
    howToRemember: "'V' looks like a downward arrow placing the text.",
  },
  {
    shortDescription: "Open the command palette",
    editorsUsing: ["VS Code", "Atom", "WebStorm", "Sublime Text", "Brackets"],
    shortcut: "Ctrl + Shift + P",
    howToRemember: "Think of it as 'Power Commands'.",
  },
  {
    shortDescription: "Indent the selected block",
    editorsUsing: ["Sublime Text", "VS Code", "WebStorm", "Notepad++", "Vim"],
    shortcut: "Tab",
    howToRemember: "The 'Tab' key literally aligns blocks!",
  },
  {
    shortDescription: "Outdent the selected block",
    editorsUsing: ["VS Code", "Sublime Text", "WebStorm", "Vim", "Atom"],
    shortcut: "Shift + Tab",
    howToRemember: "Shift reverses the Tab's action.",
  },
  {
    shortDescription: "Comment the selected code",
    editorsUsing: [
      "VS Code",
      "Atom",
      "WebStorm",
      "Sublime Text",
      "IntelliJ IDEA",
    ],
    shortcut: "Ctrl + /",
    howToRemember: "'/' marks the line for comments.",
  },
  {
    shortDescription: "Open a new file",
    editorsUsing: ["VS Code", "Sublime Text", "Notepad++", "Brackets", "Vim"],
    shortcut: "Ctrl + N",
    howToRemember: "'N' for 'New'.",
  },
  {
    shortDescription: "Close the current file",
    editorsUsing: ["VS Code", "WebStorm", "Atom", "Notepad++", "Brackets"],
    shortcut: "Ctrl + W",
    howToRemember: "'W' like 'Wave goodbye' to the file.",
  },
  {
    shortDescription: "Open the settings menu",
    editorsUsing: [
      "VS Code",
      "IntelliJ IDEA",
      "WebStorm",
      "Vim",
      "Sublime Text",
    ],
    shortcut: "Ctrl + ,",
    howToRemember: "'Comma' for configuration.",
  },
  {
    shortDescription: "Toggle fullscreen mode",
    editorsUsing: ["VS Code", "Atom", "WebStorm", "Vim", "Sublime Text"],
    shortcut: "F11",
    howToRemember: "'F11' for 'Full' mode.",
  },
  {
    shortDescription: "Jump to a specific line",
    editorsUsing: ["VS Code", "Sublime Text", "Vim", "Brackets", "Notepad++"],
    shortcut: "Ctrl + G",
    howToRemember: "'G' for 'Go to line'.",
  },
  {
    shortDescription: "Format the code",
    editorsUsing: [
      "VS Code",
      "WebStorm",
      "IntelliJ IDEA",
      "Atom",
      "Sublime Text",
    ],
    shortcut: "Ctrl + Shift + F",
    howToRemember: "'F' for 'Format', but make it grand with Shift!",
  },
];

mobileRouter.get("/", async (req, res) => {
  res.send(shortcutTips);
});

module.exports = mobileRouter;
