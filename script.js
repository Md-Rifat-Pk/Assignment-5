
let allIssuesData = []; 

const issuesCount = document.getElementById("issues-count");

function handleLogin() {

    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin123') {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('main-page').classList.remove('hidden');
        fetchAllIssues(); 
    } else {
        alert("ভুল ইউজারনেম বা পাসওয়ার্ড! ডেমো ক্রেডেনশিয়াল ব্যবহার করো।");
    }
}


async function fetchAllIssues() {
    toggleLoader(true);
    try {
        const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const data = await response.json();
        allIssuesData = data.data; 
        renderCards(allIssuesData);
    } catch (error) {
        console.error("ডাটা লোড করতে সমস্যা হয়েছে:", error);
    } finally {
        toggleLoader(false);
    }
}

function renderCards(issues) {

    const container = document.getElementById('issues-grid');
    container.innerHTML = ""; 

    issuesCount.innerText = issues.length;

    if (issues.length === 0) {
        container.innerHTML = "<p class='col-span-full text-center text-gray-500'>কোনো ইস্যু পাওয়া যায়নি।</p>";
        return;
    }

    issues.forEach(issue => {
        const borderColor = issue.status === 'open' ? 'border-t-green-500' : 'border-t-purple-500';

        const card = document.createElement('div');
        card.className = `bg-white p-5 rounded-lg shadow-md border-t-8 ${borderColor} hover:scale-105 transition-transform cursor-pointer`;
        card.onclick = () => showSingleIssueModal(issue.id);

        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <span class="text-xs font-bold uppercase px-2 py-1 bg-gray-100 rounded">${issue.category}</span>
                <span class="text-xs text-gray-400">${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
            <h3 class="font-bold text-lg text-gray-800 line-clamp-1 mb-2">${issue.title}</h3>
            <p class="text-sm text-gray-600 line-clamp-2 mb-4">${issue.description}</p>
            <div class="flex justify-between items-center text-xs font-medium text-gray-500">
                <span>👤 ${issue.author}</span>
                <span class="bg-blue-50 text-blue-600 px-2 py-1 rounded">${issue.priority}</span>
            </div>
        `;

        container.appendChild(card);
    });
}
function filterIssues(type) {
    document.querySelectorAll('[id^="tab-"]').forEach(tab => tab.classList.remove('active-tab'));
    document.getElementById(`tab-${type}`).classList.add('active-tab');

    if (type === 'all') {
        renderCards(allIssuesData);
    } else {
        const filtered = allIssuesData.filter(item => item.status === type);
        renderCards(filtered);
    }
}

async function handleSearch() {
    const searchText = document.getElementById('search-input').value;
    if (!searchText) return;

    toggleLoader(true);
    try {
        const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
        const data = await response.json();
        renderCards(data.data);
    } catch (error) {
        alert("সার্চ করার সময় এরর হয়েছে।");
    } finally {
        toggleLoader(false);
    }
}

async function showSingleIssueModal(id) {
    toggleLoader(true);

    console.log(id);

    try {
        const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
        const data = await response.json();
        const item = data.data;
        console.log(item);

        const modalBody = document.getElementById('modal-body');

        modalBody.innerHTML = `
            <h2 class="text-2xl font-bold mb-4 text-blue-700">${item.title}</h2>

            <div class="flex gap-2 mb-4">
                <span class="badge badge-success">${item.status}</span>
                <span class="badge badge-warning">${item.label}</span>
            </div>

            <p class="text-gray-700 leading-relaxed mb-6 border-b pb-4">
                ${item.description}
            </p>

            <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <p><strong>Author:</strong> ${item.author}</p>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Priority:</strong> ${item.priority}</p>
                <p><strong>Date:</strong> ${new Date(item.createdAt).toLocaleString()}</p>
            </div>
        `;

        document.getElementById("issue_modal").showModal();

    } catch (error) {
        alert("ডিটেইলস পাওয়া যায়নি।");
    } finally {
        toggleLoader(false);
    }
}
function closeModal() {
    document.getElementById('issue-modal').classList.add('hidden');
}

function toggleLoader(show) {
    const loader = document.getElementById('loader');
    show ? loader.classList.remove('hidden') : loader.classList.add('hidden');
}