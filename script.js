document.addEventListener('DOMContentLoaded', function() {

    // ─── Scroll Progress Bar ───
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // ─── Back to Top Button ───
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── Navbar scroll effect ───
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ─── Mobile menu toggle ───
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ─── Smooth scroll for anchor links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ─── Section Tag Blink on Scroll ───
    const sectionTagObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const tag = entry.target.querySelector('.section-tag');
                if (tag && !tag.classList.contains('blink-in')) {
                    tag.classList.add('blink-in');
                }
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('section[data-section]').forEach(function(section) {
        sectionTagObserver.observe(section);
    });

    // ─── Scroll Animations (original) ───
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('skill-category')) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-category, .project-card, .cert-card, .timeline-item, .about-content, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ─── Active nav link highlighting ───
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // ═══════════════════════════════════════════
    // SECTION 4 — MATRIX RAIN CANVAS
    // ═══════════════════════════════════════════
    const matrixCanvas = document.getElementById('matrixCanvas');
    const mCtx = matrixCanvas.getContext('2d');

    function resizeMatrixCanvas() {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    }
    resizeMatrixCanvas();
    window.addEventListener('resize', resizeMatrixCanvas);

    const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const cyberKeywords = ['SIEM', 'XDR', '0day', 'CVE', 'ACL', 'VPN', 'NAT', 'IDS', 'IPS', 'SOC', 'RCE', 'XSS', 'SQLi', 'DOS', 'MITM', 'WAF'];
    const allMatrixChars = matrixChars.split('').concat(cyberKeywords);
    const fontSize = 14;
    const columns = Math.ceil(window.innerWidth / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
        mCtx.fillStyle = 'rgba(10, 14, 23, 0.08)';
        mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        mCtx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = allMatrixChars[Math.floor(Math.random() * allMatrixChars.length)];
            const opacity = 0.04 + Math.random() * 0.03;
            mCtx.fillStyle = `rgba(0, 212, 170, ${opacity})`;
            mCtx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 60);

    // ═══════════════════════════════════════════
    // SECTION 5 — INTERACTIVE PARTICLE CURSOR
    // ═══════════════════════════════════════════
    const heroSection = document.querySelector('.hero');
    const particleContainer = document.getElementById('particleCanvas');

    heroSection.addEventListener('mousemove', function(e) {
        for (let i = 0; i < 2; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const rect = heroSection.getBoundingClientRect();
            particle.style.left = (e.clientX - rect.left) + 'px';
            particle.style.top = (e.clientY - rect.top) + 'px';
            const offsetX = (Math.random() - 0.5) * 30;
            const offsetY = (Math.random() - 0.5) * 30;
            particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            particle.style.width = (2 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            particleContainer.appendChild(particle);
            setTimeout(function() {
                particle.remove();
            }, 600);
        }
    });

    // ═══════════════════════════════════════════
    // SECTION 6 — TYPEWRITER SUBTITLE
    // ═══════════════════════════════════════════
    const typewriterEl = document.getElementById('typewriter');
    const typewriterStrings = [
        'Cybersecurity Student @ Bahrain Polytechnic',
        'MTT Intern | GRC & Network Security',
        'SOC Builder | SIEM \u00b7 SOAR \u00b7 XDR',
        'ISC\u00b2 CC \u00b7 HCIA-Datacom Certified'
    ];
    let twStringIdx = 0;
    let twCharIdx = 0;
    let twIsDeleting = false;
    let twPause = false;

    function typewrite() {
        const current = typewriterStrings[twStringIdx];
        if (twPause) return;

        if (!twIsDeleting) {
            twCharIdx++;
            typewriterEl.innerHTML = current.substring(0, twCharIdx) + '<span class="cursor-blink"></span>';

            if (twCharIdx === current.length) {
                twPause = true;
                setTimeout(function() {
                    twPause = false;
                    twIsDeleting = true;
                    typewrite();
                }, 2000);
                return;
            }
            setTimeout(typewrite, 55 + Math.random() * 30);
        } else {
            twCharIdx--;
            typewriterEl.innerHTML = current.substring(0, twCharIdx) + '<span class="cursor-blink"></span>';

            if (twCharIdx === 0) {
                twIsDeleting = false;
                twStringIdx = (twStringIdx + 1) % typewriterStrings.length;
                setTimeout(typewrite, 400);
                return;
            }
            setTimeout(typewrite, 30);
        }
    }

    typewrite();

    // ═══════════════════════════════════════════
    // SECTION 7 — ANIMATED COUNTER STATS
    // ═══════════════════════════════════════════
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let statsCounted = false;

    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const decimals = parseInt(el.getAttribute('data-decimals')) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        function update() {
            step++;
            current += increment;
            if (step >= steps) {
                el.textContent = target.toFixed(decimals) + suffix;
                return;
            }
            el.textContent = current.toFixed(decimals) + suffix;
            requestAnimationFrame(update);
        }
        update();
    }

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !statsCounted) {
                statsCounted = true;
                statNumbers.forEach(function(el) {
                    animateCounter(el);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ═══════════════════════════════════════════
    // SECTION 8 — INTERACTIVE TERMINAL
    // ═══════════════════════════════════════════
    const terminalLines = document.getElementById('terminalLines');
    const terminalInput = document.getElementById('terminalInput');
    const terminalBody = document.querySelector('.terminal-body');

    function addTerminalLine(html) {
        const div = document.createElement('div');
        div.classList.add('terminal-line');
        div.innerHTML = html;
        terminalLines.appendChild(div);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function addTerminalOutput(lines, isHighlight) {
        lines.forEach(function(line) {
            addTerminalLine('<span class="' + (isHighlight ? 'output-line highlight' : 'output-line') + '">' + line + '</span>');
        });
    }

    function addTerminalError(cmd) {
        addTerminalLine('<span class="error-line">bash: ' + cmd + ': command not found</span>');
    }

    function addTerminalPrompt(cmd) {
        addTerminalLine('<span class="cmd-echo"><span class="prompt">$ </span>' + cmd + '</span>');
    }

    const terminalCommands = {
        'whois mohammed': function() {
            addTerminalOutput([
                'Name: Mohammed Saleh',
                'Role: Cybersecurity Student',
                'Location: Muharraq, Bahrain',
                'Status: Available for opportunities'
            ]);
        },
        'ls skills/': function() {
            addTerminalOutput([
                '<span style="color:var(--accent-primary)">networking/</span>',
                '<span style="color:var(--accent-primary)">security/</span>',
                '<span style="color:var(--accent-primary)">tools/</span>',
                '<span style="color:var(--accent-primary)">programming/</span>'
            ]);
        },
        'cat certifications.txt': function() {
            addTerminalOutput([
                '1. CC - Certified in Cybersecurity (ISC\u00b2)',
                '2. HCIA-Datacom (Huawei) - In Progress',
                '3. Cybersecurity Leadership & Management (Coursera)',
                '4. CCNA (Cisco) - In Progress'
            ]);
        },
        'help': function() {
            addTerminalOutput([
                'Available commands:',
                '  whois mohammed         - Display personal info',
                '  ls skills/             - List skill categories',
                '  cat certifications.txt - List certifications',
                '  ping bahrain.bh        - Ping simulation',
                '  download cv            - Download resume',
                '  help                   - Show this help',
                '  clear                  - Clear terminal'
            ]);
        },
        'download cv': function() {
            addTerminalOutput([
                'Initiating secure transfer... mohammed_saleh_cv.pdf'
            ]);
            var cvLink = document.querySelector('[download]');
            if (cvLink) cvLink.click();
        }
    };

    // Special async command: ping
    function handlePing() {
        let count = 0;
        function pingStep() {
            if (count >= 4) return;
            const time = 8 + Math.floor(Math.random() * 10);
            addTerminalOutput([
                'PING bahrain.bh: 56 bytes... Reply from bahrain.bh: time=' + time + 'ms TTL=64'
            ]);
            count++;
            setTimeout(pingStep, 300);
        }
        pingStep();
    }

    function processCommand(cmd) {
        const trimmed = cmd.trim().toLowerCase();
        addTerminalPrompt(cmd);

        if (trimmed === 'clear') {
            terminalLines.innerHTML = '';
            return;
        }

        if (trimmed === 'ping bahrain.bh') {
            handlePing();
            return;
        }

        if (terminalCommands[trimmed]) {
            terminalCommands[trimmed]();
        } else if (trimmed !== '') {
            addTerminalError(cmd);
        }
    }

    // Command history
    var commandHistory = [];
    var historyIndex = -1;

    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            var cmd = terminalInput.value;
            if (cmd.trim() !== '') {
                commandHistory.push(cmd);
            }
            historyIndex = commandHistory.length;
            processCommand(cmd);
            terminalInput.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        }
    });

    // Auto-type "whois mohammed" on page load
    function autoTypeCommand() {
        const cmd = 'whois mohammed';
        let idx = 0;
        function typeChar() {
            if (idx < cmd.length) {
                terminalInput.value += cmd[idx];
                idx++;
                setTimeout(typeChar, 60);
            } else {
                setTimeout(function() {
                    processCommand(cmd);
                    terminalInput.value = '';
                }, 300);
            }
        }
        setTimeout(typeChar, 800);
    }

    autoTypeCommand();

    // ═══════════════════════════════════════════
    // SECTION 10 — SKILL FILTER TABS
    // ═══════════════════════════════════════════
    const filterTabs = document.querySelectorAll('.filter-tab');
    const skillCategories = document.querySelectorAll('.skill-category');

    filterTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            filterTabs.forEach(function(t) { t.classList.remove('active'); });
            tab.classList.add('active');
            const filter = tab.getAttribute('data-filter');

            skillCategories.forEach(function(cat) {
                if (filter === 'all' || cat.getAttribute('data-category') === filter) {
                    cat.classList.remove('hidden');
                    cat.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                } else {
                    cat.classList.add('hidden');
                }
            });
        });
    });

    // ═══════════════════════════════════════════
    // SECTION 11 — PROJECT MODAL
    // ═══════════════════════════════════════════
    const projectData = {
        enterprise: {
            icon: '<i class="fas fa-project-diagram"></i>',
            title: 'Enterprise Network & Cybersecurity Infrastructure Design',
            status: 'completed',
            statusLabel: 'Completed',
            description: 'Designed and simulated a full enterprise network infrastructure using Cisco Packet Tracer and EVE-NG. The project involved implementing OSPF multi-area routing, VLAN-based segmentation, and NAT for internet access. Security layers included ACLs, zone-based firewalls, and IDS deployment. Traffic was analyzed using Wireshark and Nmap to validate security policies and identify potential vulnerabilities across the network topology.',
            objectives: [
                'Design a multi-site enterprise network with OSPF and VLAN segmentation',
                'Implement ACLs, firewalls, and IDS for defense-in-depth security',
                'Perform traffic analysis and vulnerability scanning with Wireshark and Nmap'
            ],
            tech: ['Packet Tracer', 'EVE-NG', 'Wireshark', 'Nmap', 'OSPF']
        },
        soc: {
            icon: '<i class="fas fa-shield-alt"></i>',
            title: 'SOC Home Lab (SIEM & SOAR Simulation)',
            status: 'completed',
            statusLabel: 'Completed',
            description: 'Built a fully functional Security Operations Center home lab simulating real-world enterprise environments. Wazuh serves as the SIEM for log collection and alerting, pfSense acts as the perimeter firewall, and Shuffle automates incident response playbooks. The lab was tested with simulated attacks including brute-force attempts, malware drops, and privilege escalation to validate detection and response workflows end-to-end.',
            objectives: [
                'Deploy Wazuh SIEM for centralized log monitoring and alerting',
                'Integrate pfSense firewall with SIEM for network-level threat detection',
                'Automate incident response workflows using Shuffle SOAR playbooks'
            ],
            tech: ['Wazuh', 'pfSense', 'Shuffle', 'SIEM', 'SOAR']
        },
        ml: {
            icon: '<i class="fas fa-brain"></i>',
            title: 'ML-Based Intrusion Detection System',
            status: 'completed',
            statusLabel: 'Completed',
            description: 'Developed a machine learning pipeline to detect network intrusions from flow-level traffic data. The project applies preprocessing techniques including normalization and feature selection, then trains classification models to distinguish benign from malicious traffic. Model evaluation uses precision, recall, and F1-score to measure performance on the NSL-KDD benchmark dataset.',
            objectives: [
                'Build an ML pipeline for network intrusion detection from flow data',
                'Apply feature engineering and dimensionality reduction for model optimization',
                'Evaluate model accuracy using precision, recall, and F1-score metrics'
            ],
            tech: ['Python', 'Machine Learning', 'Data Analysis', 'Network Security']
        },
        iot: {
            icon: '<i class="fas fa-server"></i>',
            title: 'IoT Security Project',
            status: 'completed',
            statusLabel: 'Completed',
            description: 'Implemented security measures on resource-constrained IoT devices including Raspberry Pi and ESP32 microcontrollers. The project focused on securing communication channels using TLS/DTLS, hardening device firmware, and performing vulnerability assessments against common IoT attack vectors. The result was a hardened IoT framework suitable for deployment in smart home or industrial environments.',
            objectives: [
                'Implement TLS/DTLS encryption on Raspberry Pi and ESP32 devices',
                'Harden IoT firmware and apply secure boot configurations',
                'Conduct vulnerability assessment against OWASP IoT Top 10'
            ],
            tech: ['Raspberry Pi', 'ESP32', 'IoT Security', 'Embedded Systems']
        }
    };

    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');

    document.querySelectorAll('.project-card').forEach(function(card) {
        card.addEventListener('click', function() {
            const key = card.getAttribute('data-project');
            const data = projectData[key];
            if (!data) return;

            document.getElementById('modalIcon').innerHTML = data.icon;
            document.getElementById('modalTitle').textContent = data.title;

            const statusEl = document.getElementById('modalStatus');
            statusEl.textContent = 'Status: ' + data.statusLabel;
            statusEl.className = 'modal-status ' + data.status;

            document.getElementById('modalDescription').textContent = data.description;

            const objList = document.getElementById('modalObjectives');
            objList.innerHTML = '';
            data.objectives.forEach(function(obj) {
                const li = document.createElement('li');
                li.textContent = obj;
                objList.appendChild(li);
            });

            const tagsEl = document.getElementById('modalTags');
            tagsEl.innerHTML = '';
            data.tech.forEach(function(t) {
                const span = document.createElement('span');
                span.textContent = t;
                tagsEl.appendChild(span);
            });

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });

    // ═══════════════════════════════════════════
    // CV Download Terminal Overlay
    // ═══════════════════════════════════════════
    const cvOverlay   = document.getElementById('cvTerminalOverlay');
    const cvTermBody  = document.getElementById('cvTerminalBody');

    function openCvTerminal(fileHref) {
        cvTermBody.innerHTML = '';
        cvOverlay.classList.add('active');

        const lines = [
            { text: '$ ./secure_transfer.sh --file Mohammed_Saleh_CV.pdf', cls: 'prompt',  delay: 0    },
            { text: '',                                                       cls: 'dim',    delay: 180  },
            { text: '[✔] Authenticating session...',                         cls: 'dim',    delay: 360  },
            { text: '[✔] Establishing encrypted channel (TLS 1.3)',          cls: 'dim',    delay: 600  },
            { text: '[✔] Verifying file integrity (SHA-256)...',             cls: 'dim',    delay: 860  },
            { text: '',                                                       cls: 'dim',    delay: 1000 },
            { text: 'File    : Mohammed_Saleh_CV.pdf',                       cls: 'white',  delay: 1100 },
            { text: 'Size    : 184 KB',                                      cls: 'white',  delay: 1200 },
            { text: 'Target  : /downloads/Mohammed_Saleh_CV.pdf',            cls: 'white',  delay: 1300 },
            { text: '',                                                       cls: 'dim',    delay: 1400 },
            { text: 'Transferring',                                           cls: 'bar',    delay: 1500, isBar: true },
            { text: '',                                                       cls: 'dim',    delay: 2800 },
            { text: '[✔] Transfer complete — 100%',                          cls: 'green',  delay: 2900 },
            { text: '[✔] Download initiated.',                               cls: 'green',  delay: 3050 },
            { text: '',                                                       cls: 'dim',    delay: 3150 },
            { text: '$ _',                                                    cls: 'amber',  delay: 3250 },
        ];

        let downloadTriggered = false;

        lines.forEach(function(line) {
            setTimeout(function() {
                if (line.isBar) {
                    const barEl = document.createElement('span');
                    barEl.className = 'cv-line bar';
                    barEl.innerHTML =
                        'Transferring  ' +
                        '<span class="cv-progress-track">' +
                            '<span class="cv-progress-fill" id="cvProgressFill"></span>' +
                        '</span>' +
                        '  <span id="cvPct">0%</span>';
                    cvTermBody.appendChild(barEl);
                    cvTermBody.scrollTop = cvTermBody.scrollHeight;

                    requestAnimationFrame(function() {
                        const fill = document.getElementById('cvProgressFill');
                        const pct  = document.getElementById('cvPct');
                        if (fill) fill.style.width = '100%';

                        let count = 0;
                        const counter = setInterval(function() {
                            count += 2;
                            if (count > 100) { count = 100; clearInterval(counter); }
                            if (pct) pct.textContent = count + '%';
                        }, 24);
                    });
                    return;
                }

                const el = document.createElement('span');
                el.className = 'cv-line ' + (line.cls || '');
                el.textContent = line.text;
                cvTermBody.appendChild(el);
                cvTermBody.scrollTop = cvTermBody.scrollHeight;

                if (!downloadTriggered && line.text.includes('Transfer complete')) {
                    downloadTriggered = true;
                    const a = document.createElement('a');
                    a.href = fileHref;
                    a.download = 'Mohammed_Saleh_CV.pdf';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            }, line.delay);
        });

        setTimeout(function() {
            cvOverlay.classList.remove('active');
            setTimeout(function() {
                cvTermBody.innerHTML = '';
            }, 400);
        }, 3250 + 1400);
    }

    document.querySelectorAll('[download]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openCvTerminal(this.getAttribute('href'));
        });
    });

    cvOverlay.addEventListener('click', function(e) {
        if (e.target === cvOverlay) {
            cvOverlay.classList.remove('active');
        }
    });

    console.log('Portfolio loaded successfully');
});
