const API_URL = "http://localhost:5000/api";

        function showPage(pageId) {
            document.querySelectorAll("div").forEach(div => div.classList.add("hidden"));
            const page = document.getElementById(pageId);
            page.classList.remove("hidden");
            page.classList.add("fade-in");
        }

        document.getElementById("login-form")?.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Login successful (Backend needed)");
            showPage("vote");
        });

        document.getElementById("register-form")?.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Registration successful (Backend needed)");
            showPage("login");
        });

        document.getElementById("vote-form")?.addEventListener("submit", function (event) {
            event.preventDefault();
            const selectedCandidate = document.querySelector('input[name="candidate"]:checked');
            if (selectedCandidate) {
                alert(`You voted for ${selectedCandidate.value} (Backend needed)`);
                showPage("results");
                updateResults(selectedCandidate.value);
            } else {
                alert("Please select a candidate.");
            }
        });

        function updateResults(candidate) {
            const candidateABar = document.getElementById("candidate-a-bar");
            const candidateBBar = document.getElementById("candidate-b-bar");
            if (candidate === "Candidate A") {
                candidateABar.style.width = "60%";
                candidateBBar.style.width = "40%";
            } else if (candidate === "Candidate B") {
                candidateABar.style.width = "50%";
                candidateBBar.style.width = "50%";
            }
        }

        document.addEventListener("DOMContentLoaded", function () {
            const resultsDiv = document.getElementById("results-data");
            if (resultsDiv) {
                resultsDiv.innerHTML = `<p>Candidate A: 55%</p><p>Candidate B: 45%</p>`;
            }
        });
