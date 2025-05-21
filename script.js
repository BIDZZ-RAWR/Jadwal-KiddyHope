(() => {
    // Data Shift
    const shiftData = {
        'Cici':  ['P', 'P', 'P', 'S', 'X', 'PS', 'S', 'S', 'P', 'P', 'S', 'PS', 'P', 'X', 'S', 'S', 'P', 'P', 'PS', 'X', 'S', 'S', 'S', 'S', 'P', 'PS', 'S', 'S', 'P', 'P', 'X'],
        'Irma': ['S', 'S', 'S', 'P', 'PS', 'X', 'P', 'P', 'S', 'S', 'P', 'X', 'S', 'PS', 'P', 'P', 'S', 'S', 'X', 'PS', 'P', 'P', 'P', 'P', 'S', 'X', 'P', 'P', 'S', 'S', 'PS'],
        'Yesa': ['P', 'P', 'S', 'X', 'S', 'S', 'PS', 'S', 'P', 'P', 'P', 'S', 'X', 'P', 'PS', 'P', 'P', 'P', 'P', 'X', 'PS', 'S', 'S', 'S', 'P', 'S', 'X', 'PS', 'P', 'P', 'S'],
        'Aya':  ['S', 'S', 'P', 'PS', 'P', 'P', 'X', 'P', 'S', 'S', 'S', 'P', 'PS', 'S', 'X', 'S', 'S', 'S', 'S', 'PS', 'X', 'P', 'P', 'P', 'P', 'P', 'PS', 'X', 'S', 'S', 'P'],
        'Agus': ['P', 'P', 'P', 'S', 'S', 'S', 'S', 'X', 'PS', 'P', 'P', 'S', 'S', 'S', 'PS', 'X', 'S', 'S', 'P', 'P', 'P', 'PS', 'X', 'S', 'P', 'P', 'P', 'PS', 'P', 'X', 'S'],
        'Abid': ['S', 'S', 'S', 'P', 'P', 'P', 'P', 'S', 'X', 'S', 'S', 'P', 'P', 'P', 'X', 'PS', 'P', 'P', 'S', 'S', 'S', 'X', 'PS', 'S', 'S', 'S', 'S', 'X', 'S', 'PS', 'P']
    };

    // Constants
    const MONTH = 'Mei';
    const YEAR = '2025';
    const VERSION = '1.0.0';
    const APP_NAME = 'Jadwal Shift Karyawan';

    // DOM Elements
    const elements = {
        headerRow: document.querySelector('.schedule-table thead tr'),
        tbody: document.querySelector('.schedule-table tbody'),
        todayBtn: document.getElementById('todayBtn'),
        tomorrowBtn: document.getElementById('tomorrowBtn'),
        allBtn: document.getElementById('allBtn'),
        loadingOverlay: document.getElementById('loading-overlay'),
        notification: document.getElementById('notification'),
        notificationMessage: document.getElementById('notification-message'),
        searchInput: document.getElementById('searchInput'),
        clearSearch: document.getElementById('clearSearch'),
        shiftFilter: document.getElementById('shiftFilter'),
        exportBtn: document.getElementById('exportBtn'),
        printBtn: document.getElementById('printBtn'),
        shareBtn: document.getElementById('shareBtn'),
        shareModal: document.getElementById('shareModal'),
        modalClose: document.querySelector('.modal-close'),
        themeToggle: document.getElementById('themeToggle'),
        themeIcon: document.getElementById('themeIcon'),
        tableWrapper: document.querySelector('.table-wrapper'),
        currentTime: document.getElementById('current-time'),
        currentDate: document.getElementById('current-date')
    };

    // State Management
    let state = {
        currentView: 'today',
        searchTerm: '',
        currentFilter: 'all',
        theme: localStorage.getItem('theme') || 'light',
        isLoading: false
    };

    // Utility Functions
    const utils = {
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        formatDate: (date) => {
            return date.toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

        formatTime: (date) => {
            return date.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        },

        calculateShiftTotals: () => {
            const totals = {
                P: 0, S: 0, PS: 0, X: 0
            };
            
            Object.values(shiftData).forEach(shifts => {
                shifts.forEach(shift => {
                    totals[shift]++;
                });
            });
            
            return totals;
        }
    };

    // UI Functions
    const ui = {
        showLoading: () => {
            state.isLoading = true;
            elements.loadingOverlay.style.display = 'flex';
        },

        hideLoading: () => {
            state.isLoading = false;
            elements.loadingOverlay.style.display = 'none';
        },

        showNotification: (message, type = 'info') => {
            elements.notificationMessage.textContent = message;
            elements.notification.className = `notification ${type}`;
            elements.notification.style.display = 'flex';
            
            setTimeout(() => {
                elements.notification.style.display = 'none';
            }, 3000);
        },

        updateDateTime: () => {
            const now = new Date();
            elements.currentTime.textContent = utils.formatTime(now);
            elements.currentDate.textContent = utils.formatDate(now);
        },

        updateTheme: () => {
            document.documentElement.setAttribute('data-theme', state.theme);
            elements.themeIcon.className = state.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        },

        clearTable: () => {
            while (elements.headerRow.children.length > 1) {
                elements.headerRow.removeChild(elements.headerRow.lastChild);
            }
            const rows = elements.tbody.getElementsByTagName('tr');
            Array.from(rows).forEach(row => {
                while (row.children.length > 1) {
                    row.removeChild(row.lastChild);
                }
            });
        }
    };

    // View Management
    const viewManager = {
        async showTodaySchedule() {
            ui.showLoading();
            try {
                state.currentView = 'today';
                const today = new Date();
                ui.clearTable();
                this.createHeaders([today.getDate()], [today]);
                this.fillTableData([today.getDate() - 1]);
                this.updateActiveButton(elements.todayBtn);
                ui.showNotification('Menampilkan jadwal hari ini');
            } catch (error) {
                console.error(error);
                ui.showNotification('Terjadi kesalahan saat memuat jadwal', 'error');
            } finally {
                ui.hideLoading();
            }
        },

        async showTomorrowSchedule() {
            ui.showLoading();
            try {
                state.currentView = 'tomorrow';
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                ui.clearTable();
                this.createHeaders([tomorrow.getDate()], [tomorrow]);
                this.fillTableData([tomorrow.getDate() - 1]);
                this.updateActiveButton(elements.tomorrowBtn);
                ui.showNotification('Menampilkan jadwal besok');
            } catch (error) {
                console.error(error);
                ui.showNotification('Terjadi kesalahan saat memuat jadwal', 'error');
            } finally {
                ui.hideLoading();
            }
        },

        async showAllSchedule() {
            ui.showLoading();
            try {
                state.currentView = 'all';
                ui.clearTable();
                const days = Array.from({length: 31}, (_, i) => i + 1);
                const dates = days.map(day => new Date(2025, 4, day));
                this.createHeaders(days, dates);
                this.fillTableData(Array.from({length: 31}, (_, i) => i));
                this.updateActiveButton(elements.allBtn);
                ui.showNotification('Menampilkan semua jadwal');
            } catch (error) {
                console.error(error);
                ui.showNotification('Terjadi kesalahan saat memuat jadwal', 'error');
            } finally {
                ui.hideLoading();
            }
        },

        createHeaders(days, dates) {
            days.forEach((day, index) => {
                const th = document.createElement('th');
                th.className = 'date-header';
                const date = dates[index];
                th.innerHTML = `
                    <div class="header-content">
                        <span class="day-number">${day}</span>
                        <span class="day-name">${date.toLocaleDateString('id-ID', { weekday: 'short' })}</span>
                    </div>
                `;
                elements.headerRow.appendChild(th);
            });
        },

        fillTableData(daysIndices) {
            const rows = elements.tbody.getElementsByTagName('tr');
            Array.from(rows).forEach(row => {
                const name = row.cells[0].textContent.trim();
                if (this.shouldShowRow(name)) {
                    const shifts = shiftData[name];
                    row.style.display = '';
                    
                    daysIndices.forEach(dayIndex => {
                        const td = document.createElement('td');
                        const shift = shifts[dayIndex];
                        if (this.shouldShowShift(shift)) {
                            td.textContent = shift;
                            td.className = `shift-${shift.toLowerCase()}`;
                            td.setAttribute('data-shift', shift);
                            td.setAttribute('data-date', dayIndex + 1);
                            row.appendChild(td);
                        }
                    });
                } else {
                    row.style.display = 'none';
                }
            });
        },

        shouldShowRow(name) {
            return name.toLowerCase().includes(state.searchTerm.toLowerCase());
        },

        shouldShowShift(shift) {
            return state.currentFilter === 'all' || shift === state.currentFilter;
        },

        updateActiveButton(activeButton) {
            [elements.todayBtn, elements.tomorrowBtn, elements.allBtn].forEach(btn => {
                btn.classList.remove('active');
            });
            activeButton.classList.add('active');
        }
    };

    // Event Handlers
    const handlers = {
        handleSearch: utils.debounce(() => {
            state.searchTerm = elements.searchInput.value;
            elements.clearSearch.style.display = state.searchTerm ? 'block' : 'none';
            viewManager[`show${state.currentView.charAt(0).toUpperCase() + state.currentView.slice(1)}Schedule`]();
        }, 300),

        handleFilter() {
            state.currentFilter = elements.shiftFilter.value;
            viewManager[`show${state.currentView.charAt(0).toUpperCase() + state.currentView.slice(1)}Schedule`]();
        },

        handlePrint() {
            const currentSearchTerm = state.searchTerm;
            const currentFilter = state.currentFilter;
            
            state.searchTerm = '';
            state.currentFilter = 'all';
            
            viewManager.showAllSchedule();
            
            setTimeout(() => {
                window.print();
                
                state.searchTerm = currentSearchTerm;
                state.currentFilter = currentFilter;
                
                viewManager[`show${state.currentView.charAt(0).toUpperCase() + state.currentView.slice(1)}Schedule`]();
            }, 300);
        },

        handleExport() {
            try {
                const rows = [['Nama', ...Array.from({length: 31}, (_, i) => i + 1)]];
                Object.entries(shiftData).forEach(([name, shifts]) => {
                    rows.push([name, ...shifts]);
                });
                
                const csvContent = rows.map(row => row.join(',')).join('\n');
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `jadwal_shift_${MONTH}_${YEAR}.csv`;
                a.click();
                window.URL.revokeObjectURL(url);
                ui.showNotification('Jadwal berhasil diexport');
            } catch (error) {
                console.error(error);
                ui.showNotification('Gagal mengexport jadwal', 'error');
            }
        },

        handleShare(platform) {
            const text = `${APP_NAME} - ${MONTH} ${YEAR}`;
            const url = window.location.href;
            
            switch(platform) {
                case 'whatsapp':
                    window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`);
                    break;
                case 'telegram':
                    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
                    break;
                case 'email':
                    window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
                    break;
                case 'copy':
                    navigator.clipboard.writeText(url).then(() => {
                        ui.showNotification('Link berhasil disalin');
                    });
                    break;
            }
            this.toggleShareModal();
        },

        toggleShareModal() {
            elements.shareModal.style.display = elements.shareModal.style.display === 'none' ? 'block' : 'none';
        },

        toggleTheme() {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
            ui.updateTheme();
            ui.showNotification(`Tema ${state.theme === 'light' ? 'Terang' : 'Gelap'} diaktifkan`);
        }
    };

    // Initialize Application
    function init() {
        // Set initial theme
        ui.updateTheme();

        // Start datetime updates
        ui.updateDateTime();
        setInterval(ui.updateDateTime, 1000);

        // Event Listeners
        elements.todayBtn.addEventListener('click', () => viewManager.showTodaySchedule());
        elements.tomorrowBtn.addEventListener('click', () => viewManager.showTomorrowSchedule());
        elements.allBtn.addEventListener('click', () => viewManager.showAllSchedule());
        elements.searchInput.addEventListener('input', handlers.handleSearch);
        elements.clearSearch.addEventListener('click', () => {
            elements.searchInput.value = '';
            handlers.handleSearch();
        });
        elements.shiftFilter.addEventListener('change', () => handlers.handleFilter());
        elements.exportBtn.addEventListener('click', () => handlers.handleExport());
        elements.printBtn.addEventListener('click', () => handlers.handlePrint());
        elements.shareBtn.addEventListener('click', () => handlers.toggleShareModal());
        elements.modalClose.addEventListener('click', () => handlers.toggleShareModal());
        elements.themeToggle.addEventListener('click', () => handlers.toggleTheme());

        // Share buttons
        document.querySelectorAll('.share-button').forEach(button => {
            button.addEventListener('click', () => handlers.handleShare(button.dataset.platform));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.shareModal.style.display === 'block') {
                handlers.toggleShareModal();
            }
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === elements.shareModal) {
                handlers.toggleShareModal();
            }
        });

        // Print events
        window.addEventListener('beforeprint', () => {
            if (state.currentView !== 'all') {
                viewManager.showAllSchedule();
            }
        });

        window.addEventListener('afterprint', () => {
            if (state.currentView !== 'all') {
                viewManager[`show${state.currentView.charAt(0).toUpperCase() + state.currentView.slice(1)}Schedule`]();
            }
        });

        // Initialize with today's schedule
        viewManager.showTodaySchedule();
    }

    // Start the application
    init();
})();