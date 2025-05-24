(() => {
    // Data Shift
    const shiftData = {
        'Cici':  ['P', 'P', 'P', 'S', 'X', 'PS', 'S', 'S', 'P', 'P', 'S', 'PS', 'P', 'X', 'S', 'S', 'P', 'P', 'PS', 'X', 'S', 'S', 'S', 'S', 'P', 'PS', 'S', 'S', 'P', 'P', 'X'],
        'Irma': ['S', 'S', 'S', 'P', 'PS', 'X', 'P', 'P', 'S', 'S', 'P', 'X', 'S', 'PS', 'P', 'P', 'S', 'S', 'X', 'PS', 'P', 'P', 'P', 'P', 'S', 'X', 'P', 'P', 'S', 'S', 'PS'],
        'Yesa': ['P', 'P', 'S', 'X', 'S', 'S', 'PS', 'S', 'P', 'P', 'P', 'S', 'X', 'P', 'PS', 'P', 'P', 'P', 'P', 'X', 'PS', 'S', 'S', 'S', 'S', 'S', 'X', 'PS', 'P', 'P', 'S'],
        'Aya':  ['S', 'S', 'P', 'PS', 'P', 'P', 'X', 'P', 'S', 'S', 'S', 'P', 'PS', 'S', 'X', 'S', 'S', 'S', 'S', 'PS', 'X', 'P', 'P', 'P', 'P', 'P', 'PS', 'X', 'S', 'S', 'P'],
        'Agus': ['P', 'P', 'P', 'S', 'S', 'S', 'S', 'X', 'PS', 'P', 'P', 'S', 'S', 'S', 'PS', 'X', 'S', 'S', 'P', 'P', 'P', 'PS', 'X', 'S', 'P', 'P', 'P', 'PS', 'P', 'X', 'S'],
        'Abid': ['S', 'S', 'S', 'P', 'P', 'P', 'P', 'S', 'X', 'S', 'S', 'P', 'P', 'P', 'X', 'PS', 'P', 'P', 'S', 'S', 'S', 'X', 'PS', 'P', 'S', 'S', 'S', 'X', 'S', 'PS', 'P']
    };

    // Constants
    const MONTH = 'Mei';
    const YEAR = '2025';
    const APP_NAME = 'Jadwal Shift KiddyHope';

    // DOM Elements
    const elements = {
        headerRow: document.querySelector('.schedule-table thead tr'),
        tbody: document.querySelector('.schedule-table tbody'),
        tableView: document.getElementById('table-view'),
        calendarView: document.getElementById('calendar-view'),
        todayBtn: document.getElementById('todayBtn'),
        tomorrowBtn: document.getElementById('tomorrowBtn'),
        allBtn: document.getElementById('allBtn'),
        tableBtn: document.getElementById('tableBtn'),
        calendarBtn: document.getElementById('calendarBtn'),
        loadingOverlay: document.getElementById('loading-overlay'),
        notification: document.getElementById('notification'),
        notificationMessage: document.getElementById('notification-message'),
        searchInput: document.getElementById('searchInput'),
        clearSearch: document.getElementById('clearSearch'),
        shiftFilter: document.getElementById('shiftFilter'),
        exportBtn: document.getElementById('exportBtn'),
        printBtn: document.getElementById('printBtn'),
        pdfBtn: document.getElementById('pdfBtn'),
        shareBtn: document.getElementById('shareBtn'),
        shareModal: document.getElementById('shareModal'),
        modalClose: document.querySelector('.modal-close'),
        themeToggle: document.getElementById('themeToggle'),
        themeIcon: document.getElementById('themeIcon'),
        currentTime: document.getElementById('current-time'),
        currentDate: document.getElementById('current-date'),
        summaryTbody: document.querySelector('.summary-table tbody'),
        notificationClose: document.querySelector('.notification-close')
    };

    // State Management
    let state = {
        currentView: 'table',
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
        formatDate: (date) => date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        formatTime: (date) => date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
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
            elements.themeIcon.className = `fas fa-${state.theme === 'light' ? 'moon' : 'sun'} fa-lg`;
        },
        clearTable: () => {
            while (elements.headerRow.children.length > 1) {
                elements.headerRow.removeChild(elements.headerRow.lastChild);
            }
            elements.tbody.innerHTML = '';
        }
    };

    // View Management
    const viewManager = {
        async showTodaySchedule() {
            ui.showLoading();
            try {
                state.currentView = 'today';
                const today = new Date();
                const dayIndex = today.getDate() - 1;
                if (dayIndex < 0 || dayIndex >= 31) {
                    throw new Error('Tanggal hari ini di luar rentang jadwal');
                }
                ui.clearTable();
                this.createHeaders([today.getDate()], [today]);
                this.fillTableData([dayIndex]);
                this.updateActiveButton(elements.todayBtn);
                this.updateSummary();
                ui.showNotification('Menampilkan jadwal hari ini');
            } catch (error) {
                console.error('Error showing today schedule:', error);
                ui.showNotification('Gagal memuat jadwal hari ini', 'error');
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
                const dayIndex = tomorrow.getDate() - 1;
                if (dayIndex < 0 || dayIndex >= 31) {
                    throw new Error('Tanggal besok di luar rentang jadwal');
                }
                ui.clearTable();
                this.createHeaders([tomorrow.getDate()], [tomorrow]);
                this.fillTableData([dayIndex]);
                this.updateActiveButton(elements.tomorrowBtn);
                this.updateSummary();
                ui.showNotification('Menampilkan jadwal besok');
            } catch (error) {
                console.error('Error showing tomorrow schedule:', error);
                ui.showNotification('Gagal memuat jadwal besok', 'error');
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
                this.updateSummary();
                ui.showNotification('Menampilkan semua jadwal');
            } catch (error) {
                console.error('Error showing all schedule:', error);
                ui.showNotification('Gagal memuat semua jadwal', 'error');
            } finally {
                ui.hideLoading();
            }
        },
        async showTableSchedule() {
            ui.showLoading();
            try {
                state.currentView = 'table';
                ui.clearTable();
                const days = Array.from({length: 31

}, (_, i) => i + 1);
                const dates = days.map(day => new Date(2025, 4, day));
                this.createHeaders(days, dates);
                this.fillTableData(Array.from({length: 31}, (_, i) => i));
                this.updateActiveButton(elements.tableBtn);
                this.updateSummary();
                ui.showNotification('Menampilkan tabel jadwal');
            } catch (error) {
                console.error('Error showing table schedule:', error);
                ui.showNotification('Gagal memuat tabel jadwal', 'error');
            } finally {
                ui.hideLoading();
            }
        },
        async showCalendarSchedule() {
            ui.showLoading();
            try {
                state.currentView = 'calendar';
                this.initializeCalendar();
                this.updateActiveButton(elements.calendarBtn);
                ui.showNotification('Menampilkan kalender jadwal');
            } catch (error) {
                console.error('Error showing calendar schedule:', error);
                ui.showNotification('Gagal memuat kalender jadwal', 'error');
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
            elements.tbody.innerHTML = '';
            Object.entries(shiftData).forEach(([name, shifts]) => {
                if (this.shouldShowRow(name)) {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td class="fixed-column">
                            <div class="employee-name">
                                <i class="fas fa-user fa-lg"></i>
                                <span>${name}</span>
                            </div>
                        </td>
                    `;
                    daysIndices.forEach(dayIndex => {
                        const shift = shifts[dayIndex] || '';
                        if (this.shouldShowShift(shift)) {
                            const td = document.createElement('td');
                            td.textContent = shift;
                            td.className = shift ? `shift-${shift.toLowerCase()}` : '';
                            td.setAttribute('data-shift', shift);
                            td.setAttribute('data-date', dayIndex + 1);
                            tr.appendChild(td);
                        }
                    });
                    elements.tbody.appendChild(tr);
                }
            });
        },
        updateSummary() {
            elements.summaryTbody.innerHTML = '';
            const totals = { P: 0, S: 0, PS: 0, X: 0 };
            Object.entries(shiftData).forEach(([name, shifts]) => {
                if (this.shouldShowRow(name)) {
                    const counts = { P: 0, S: 0, PS: 0, X: 0 };
                    shifts.forEach(shift => {
                        if (this.shouldShowShift(shift)) {
                            counts[shift]++;
                            totals[shift]++;
                        }
                    });
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${name}</td>
                        <td>${counts.P}</td>
                        <td>${counts.S}</td>
                        <td>${counts.PS}</td>
                        <td>${counts.X}</td>
                    `;
                    elements.summaryTbody.appendChild(tr);
                }
            });
            elements.summaryTbody.parentElement.querySelector('#total-p').textContent = totals.P;
            elements.summaryTbody.parentElement.querySelector('#total-s').textContent = totals.S;
            elements.summaryTbody.parentElement.querySelector('#total-ps').textContent = totals.PS;
            elements.summaryTbody.parentElement.querySelector('#total-x').textContent = totals.X;
        },
        shouldShowRow(name) {
            return state.searchTerm === '' || name.toLowerCase().includes(state.searchTerm.toLowerCase());
        },
        shouldShowShift(shift) {
            return state.currentFilter === 'all' || shift === state.currentFilter;
        },
        updateActiveButton(activeButton) {
            [elements.tableBtn, elements.calendarBtn, elements.todayBtn, elements.tomorrowBtn, elements.allBtn].forEach(btn => {
                btn.classList.remove('active');
            });
            activeButton.classList.add('active');
            elements.tableView.style.display = ['table', 'today', 'tomorrow', 'all'].includes(state.currentView) ? 'block' : 'none';
            elements.calendarView.style.display = state.currentView === 'calendar' ? 'block' : 'none';
        },
        initializeCalendar() {
            const calendarEl = document.getElementById('calendar');
            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                events: this.generateCalendarEvents(),
                eventClick: (info) => {
                    ui.showNotification(
                        `${info.event.title} pada ${info.event.start.toLocaleDateString('id-ID')}: ${info.event.extendedProps.shift}`,
                        'info'
                    );
                },
                height: 'auto',
                locale: 'id',
                eventContent: (arg) => {
                    return { html: `<div>${arg.event.title}: ${arg.event.extendedProps.shift}</div>` };
                }
            });
            calendar.render();
        },
        generateCalendarEvents() {
            const events = [];
            Object.entries(shiftData).forEach(([name, shifts]) => {
                if (this.shouldShowRow(name)) {
                    shifts.forEach((shift, index) => {
                        if (this.shouldShowShift(shift)) {
                            const eventDate = new Date(2025, 4, index + 1);
                            events.push({
                                title: name,
                                start: eventDate,
                                extendedProps: { shift },
                                backgroundColor: shift === 'P' ? '#a8e6cf' : shift === 'S' ? '#ffaaa5' : shift === 'PS' ? '#ffd3b6' : '#dfe6e9',
                                borderColor: shift === 'P' ? '#1de9b6' : shift === 'S' ? '#ff7675' : shift === 'PS' ? '#ffa94d' : '#b2bec3'
                            });
                        }
                    });
                }
            });
            return events;
        }
    };

    // Event Handlers
    const handlers = {
        handleSearch: utils.debounce(() => {
            state.searchTerm = elements.searchInput.value;
            elements.clearSearch.style.display = state.searchTerm ? 'block' : 'none';
            viewManager[`show${state.currentView.charAt(0).toUpperCase() + state.currentView.slice(1)}Schedule`]();
        }, 300),
        handleClearSearch() {
            elements.searchInput.value = '';
            state.searchTerm = '';
            elements.clearSearch.style.display = 'none';
            viewManager[`show${state.currentView.charAt(0).toUpperCase() + state.currentView.slice(1)}Schedule`]();
        },
        handleFilter() {
            state.currentFilter = elements.shiftFilter.value;
            viewManager[`show${state.currentView.charAt(0).toUpperCase() + state.currentView.slice(1)}Schedule`]();
        },
        handlePrint() {
            const currentSearchTerm = state.searchTerm;
            const currentFilter = state.currentFilter;
            const currentView = state.currentView;
            state.searchTerm = '';
            state.currentFilter = 'all';
            ui.showLoading();
            viewManager.showAllSchedule().then(() => {
                setTimeout(() => {
                    try {
                        window.print();
                        ui.showNotification('Jadwal berhasil dicetak', 'success');
                    } catch (error) {
                        console.error('Error during print:', error);
                        ui.showNotification('Gagal mencetak jadwal', 'error');
                    } finally {
                        state.searchTerm = currentSearchTerm;
                        state.currentFilter = currentFilter;
                        state.currentView = currentView;
                        viewManager[`show${currentView.charAt(0).toUpperCase() + currentView.slice(1)}Schedule`]();
                        ui.hideLoading();
                    }
                }, 1000);
            }).catch(error => {
                console.error('Error rendering schedule for print:', error);
                ui.showNotification('Gagal memuat jadwal untuk cetak', 'error');
                ui.hideLoading();
            });
        },
        async handleGeneratePDF() {
            ui.showLoading();
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
            try {
                const currentSearchTerm = state.searchTerm;
                const currentFilter = state.currentFilter;
                const currentView = state.currentView;
                state.searchTerm = '';
                state.currentFilter = 'all';
                await viewManager.showAllSchedule();
                const sections = [
                    document.querySelector('.schedule-section'),
                    document.querySelector('.summary-section'),
                    document.querySelector('.legend')
                ];
                let yOffset = 10;
                for (const [index, section] of sections.entries()) {
                    if (index > 0) doc.addPage();
                    const canvas = await html2canvas(section, { scale: 2 });
                    const imgData = canvas.toDataURL('image/png');
                    const imgProps = doc.getImageProperties(imgData);
                    const pdfWidth = 270;
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    doc.addImage(imgData, 'PNG', 10, yOffset, pdfWidth, pdfHeight);
                    yOffset = 10;
                }
                doc.save(`Jadwal_Shift_${MONTH}_${YEAR}.pdf`);
                ui.showNotification('PDF berhasil diunduh', 'success');
                state.searchTerm = currentSearchTerm;
                state.currentFilter = currentFilter;
                state.currentView = currentView;
                await viewManager[`show${currentView.charAt(0).toUpperCase() + state.currentView.slice(1)}Schedule`]();
            } catch (error) {
                console.error('Error generating PDF:', error);
                ui.showNotification('Gagal membuat PDF', 'error');
            } finally {
                ui.hideLoading();
            }
        },
        handleExport() {
            try {
                const rows = [['Nama', ...Array.from({length: 31}, (_, i) => i + 1)]];
                Object.entries(shiftData).forEach(([name, shifts]) => {
                    if (viewManager.shouldShowRow(name)) {
                        rows.push([name, ...shifts]);
                    }
                });
                const csvContent = rows.map(row => row.join(',')).join('\n');
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `jadwal_shift_${MONTH}_${YEAR}.csv`;
                a.click();
                window.URL.revokeObjectURL(url);
                ui.showNotification('Jadwal berhasil diekspor ke CSV', 'success');
            } catch (error) {
                console.error('Error exporting schedule:', error);
                ui.showNotification('Gagal mengekspor jadwal', 'error');
            }
        },
        handleShare(platform) {
            const text = `${APP_NAME} - ${MONTH} ${YEAR}`;
            const url = window.location.href;
            try {
                switch (platform) {
                    case 'whatsapp':
                        window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`, '_blank');
                        break;
                    case 'telegram':
                        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                        break;
                    case 'email':
                        window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
                        break;
                    case 'copy':
                        navigator.clipboard.writeText(url).then(() => {
                            ui.showNotification('Link berhasil disalin', 'success');
                        }).catch(err => {
                            console.error('Error copying link:', err);
                            ui.showNotification('Gagal menyalin link', 'error');
                        });
                        break;
                    default:
                        throw new Error('Platform berbagi tidak valid');
                }
                handlers.toggleShareModal();
            } catch (error) {
                console.error('Error sharing:', error);
                ui.showNotification('Gagal membagikan jadwal', 'error');
            }
        },
        toggleShareModal() {
            elements.shareModal.style.display = elements.shareModal.style.display === 'none' ? 'block' : 'none';
        },
        toggleTheme() {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
            ui.updateTheme();
            ui.showNotification(`Tema ${state.theme === 'light' ? 'Terang' : 'Gelap'} diaktifkan`, 'success');
        }
    };

    // Initialize Application
    function init() {
        try {
            ui.updateTheme();
            ui.updateDateTime();
            setInterval(ui.updateDateTime, 1000);

            // Event Listeners
            elements.todayBtn.addEventListener('click', () => viewManager.showTodaySchedule());
            elements.tomorrowBtn.addEventListener('click', () => viewManager.showTomorrowSchedule());
            elements.allBtn.addEventListener('click', () => viewManager.showAllSchedule());
            elements.tableBtn.addEventListener('click', () => viewManager.showTableSchedule());
            elements.calendarBtn.addEventListener('click', () => viewManager.showCalendarSchedule());
            elements.searchInput.addEventListener('input', handlers.handleSearch);
            elements.clearSearch.addEventListener('click', handlers.handleClearSearch);
            elements.shiftFilter.addEventListener('change', handlers.handleFilter);
            elements.exportBtn.addEventListener('click', handlers.handleExport);
            elements.printBtn.addEventListener('click', handlers.handlePrint);
            elements.pdfBtn.addEventListener('click', handlers.handleGeneratePDF);
            elements.shareBtn.addEventListener('click', handlers.toggleShareModal);
            elements.modalClose.addEventListener('click', handlers.toggleShareModal);
            elements.themeToggle.addEventListener('click', handlers.toggleTheme);
            elements.notificationClose.addEventListener('click', () => {
                elements.notification.style.display = 'none';
            });
            document.querySelectorAll('.share-button').forEach(button => {
                button.addEventListener('click', () => handlers.handleShare(button.dataset.platform));
            });

            // Ripple Effect
            document.querySelectorAll('.view-controls button, .action-buttons button, .share-button').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    const ripple = document.createElement('span');
                    ripple.style.width = ripple.style.height = `${size}px`;
                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;
                    ripple.style.position = 'absolute';
                    ripple.style.borderRadius = '50%';
                    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                    ripple.style.transform = 'scale(0)';
                    ripple.style.animation = 'ripple 0.6s linear';
                    this.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                });
            });

            // Close Modal on Outside Click
            window.addEventListener('click', (e) => {
                if (e.target === elements.shareModal) handlers.toggleShareModal();
            });

            // Initialize View
            viewManager.showTableSchedule();

            // Register Service Worker
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/service-worker.js').catch(error => {
                    console.error('Service Worker registration failed:', error);
                    ui.showNotification('Gagal mendaftarkan Service Worker', 'error');
                });
            }

            console.log('Jadwal KiddyHope initialized successfully');
        } catch (error) {
            console.error('Initialization failed:', error);
            ui.showNotification('Gagal menginisialisasi aplikasi', 'error');
        }
    }

    // Start Application
    document.addEventListener('DOMContentLoaded', init);
})();
