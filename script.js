document.addEventListener('DOMContentLoaded', () => {
    // Automatically set human-readable date and day layout values
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsDay = { weekday: 'long' };
    const today = new Date();

    document.getElementById('current-date').innerText = today.toLocaleDateString('en-US', optionsDate);
    document.getElementById('current-day').innerText = today.toLocaleDateString('en-US', optionsDay);

    // Dynamic handling function to append rows to sections
    function createListItem(text, targetListId) {
        const targetList = document.getElementById(targetListId);

        const li = document.createElement('li');

        const leftWrapper = document.createElement('div');
        leftWrapper.classList.add('task-item-left');

        // Checkbox element (positioned on the right side logic handled elegantly)
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const textSpan = document.createElement('span');
        textSpan.innerText = text;

        // Toggle text crossout decoration
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                textSpan.classList.add('completed-text');
            } else {
                textSpan.classList.remove('completed-text');
            }
        });

        // Delete micro action button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&#10006;'; // Clean 'X' symbol
        deleteBtn.classList.add('delete-item-btn');
        deleteBtn.addEventListener('click', () => li.remove());

        // Connect structures
        leftWrapper.appendChild(textSpan);
        li.appendChild(leftWrapper);
        li.appendChild(checkbox); // Align checkmark boxes perfectly down the right margins
        leftWrapper.appendChild(deleteBtn); // Keep delete hidden adjacent to text string

        targetList.appendChild(li);
    }

    // Helper setup function to tie actions to user buttons
    function setupSection(inputId, buttonId, targetListId) {
        const input = document.getElementById(inputId);
        const button = document.getElementById(buttonId);

        const handleAdd = () => {
            const text = input.value.trim();
            if (text !== "") {
                createListItem(text, targetListId);
                input.value = "";
            }
        };

        button.addEventListener('click', handleAdd);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleAdd();
        });
    }

    // Initialize individual section input handlers
    setupSection('priority-input', 'add-priority-btn', 'priorities-list');
    setupSection('todo-input', 'add-todo-btn', 'main-todo-list');
});