// Inicializar Ícones Lucide
lucide.createIcons();

// Dados das Campanhas de Saúde
const dadosCampanhas = {
    'outubro-rosa': {
        titulo: 'Outubro Rosa',
        corBox: 'bg-pink-100 text-pink-700',
        causa: 'Campanha de conscientização dedicada à prevenção e ao diagnóstico precoce do Câncer de Mama e do Câncer de Colo do Útero, aumentando as chances de cura.',
        exames: [
            'Mamografia preventiva para mulheres acima dos 40 anos.',
            'Exame Citopatológico (Papanicolau) para prevenção do colo do útero.',
            'Autoexame das mamas e observação de alterações na pele ou nódulos.'
        ],
        atendimento: 'Agende seu acolhimento diretamente na recepção da UBS Parque Eldorado. Consultas preventivas disponíveis aos sábados.'
    },
    'novembro-azul': {
        titulo: 'Novembro Azul',
        corBox: 'bg-blue-100 text-blue-700',
        causa: 'Foco na saúde integral do homem e na conscientização sobre a prevenção e o diagnóstico precoce do Câncer de Próstata.',
        exames: [
            'Exame de Sangue PSA (Antígeno Prostático Específico).',
            'Avaliação médica clínica e acompanhamento de rotina.',
            'Controle da pressão arterial e exames de glicemia.'
        ],
        atendimento: 'Disponibilidade de consultas noturnas especiais para homens trabalhadores na unidade.'
    },
    'setembro-amarelo': {
        titulo: 'Setembro Amarelo',
        corBox: 'bg-amber-100 text-amber-700',
        causa: 'Campanha focada na valorização da vida, prevenção ao suicídio e saúde mental acolhedora, sem tabus ou julgamentos.',
        exames: [
            'Acolhimento psicológico individualizado.',
            'Grupos comunitários de apoio à saúde mental.',
            'Encaminhamento especializado para a rede de apoio.'
        ],
        atendimento: 'Atendimento humanizado imediato na recepção. Se precisar de apoio urgente, ligue também para o CVV no número 188.'
    },
    'abril-azul': {
        titulo: 'Abril Azul (TEA)',
        corBox: 'bg-cyan-100 text-cyan-700',
        causa: 'Conscientização sobre o Transtorno do Espectro Autista (TEA), promovendo a inclusão, a aceitação e o suporte às famílias.',
        exames: [
            'Acompanhamento do desenvolvimento infantil na puericultura.',
            'Avaliação multidisciplinar com pediatra e equipe de saúde.',
            'Orientação e suporte familiar contínuo.'
        ],
        atendimento: 'Acolhimento prioritário e multiprofissional na UBS para crianças e responsáveis.'
    }
};

let perfilSelecionadoAtual = null;

// Navegação de Perfil de Login
function abrirAcessoPortal() {
    document.getElementById('visao-publica').classList.add('hidden');
    document.getElementById('area-paciente').classList.add('hidden');
    document.getElementById('area-medico').classList.add('hidden');
    document.getElementById('area-gestao-posto').classList.add('hidden');
    document.getElementById('area-gestao-sus').classList.add('hidden');
    document.getElementById('secao-acesso-portal').classList.remove('hidden');
    resetarSelecaoPerfil();
}

function voltarInicio() {
    document.getElementById('secao-acesso-portal').classList.add('hidden');
    document.getElementById('area-paciente').classList.add('hidden');
    document.getElementById('area-medico').classList.add('hidden');
    document.getElementById('area-gestao-posto').classList.add('hidden');
    document.getElementById('area-gestao-sus').classList.add('hidden');
    document.getElementById('visao-publica').classList.remove('hidden');
}

function selecionarPerfil(perfil) {
    perfilSelecionadoAtual = perfil;
    const containerForm = document.getElementById('form-login-container');
    const containerCampos = document.getElementById('campos-login-dinamicos');
    const titulo = document.getElementById('form-login-titulo');

    containerForm.classList.remove('hidden');

    if (perfil === 'paciente') {
        titulo.innerText = 'Login do Paciente';
        containerCampos.innerHTML = `
            <div>
                <label class="text-xs font-semibold text-slate-700">CPF ou Cartão SUS</label>
                <input type="text" required placeholder="000.000.000-00" class="input-field">
            </div>
            <div>
                <label class="text-xs font-semibold text-slate-700">Senha de Acesso</label>
                <input type="password" required placeholder="••••••••" class="input-field">
            </div>
        `;
    } else if (perfil === 'medico') {
        titulo.innerText = 'Login de Médico Atendente';
        containerCampos.innerHTML = `
            <div>
                <label class="text-xs font-semibold text-slate-700">Nome do Médico</label>
                <input type="text" required placeholder="Dr. Nome Sobrenome" class="input-field">
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <label class="text-xs font-semibold text-slate-700">CRM</label>
                    <input type="text" required placeholder="00000-RS" class="input-field">
                </div>
                <div>
                    <label class="text-xs font-semibold text-slate-700">V vínculo</label>
                    <select class="input-field text-xs">
                        <option>Médico da UBS Eldorado</option>
                        <option>Médico do SUS Geral</option>
                    </select>
                </div>
            </div>
        `;
    } else if (perfil === 'gestao-posto') {
        titulo.innerText = 'Acesso à Gestão do Posto';
        containerCampos.innerHTML = `
            <div>
                <label class="text-xs font-semibold text-slate-700">Usuário de Identificação da Unidade</label>
                <input type="text" required placeholder="admin.eldorado" class="input-field">
            </div>
            <div>
                <label class="text-xs font-semibold text-slate-700">Senha Administrativa</label>
                <input type="password" required placeholder="••••••••" class="input-field">
            </div>
        `;
    } else if (perfil === 'gestao-sus') {
        titulo.innerText = 'Acesso à Regulação Municipal do SUS';
        containerCampos.innerHTML = `
            <div>
                <label class="text-xs font-semibold text-slate-700">Código de Credencial do Secretário/Regulador</label>
                <input type="text" required placeholder="SUS-REG-2026" class="input-field">
            </div>
            <div>
                <label class="text-xs font-semibold text-slate-700">Chave de Segurança</label>
                <input type="password" required placeholder="••••••••" class="input-field">
            </div>
        `;
    }
}

function resetarSelecaoPerfil() {
    perfilSelecionadoAtual = null;
    document.getElementById('form-login-container').classList.add('hidden');
}

function processarLogin() {
    document.getElementById('secao-acesso-portal').classList.add('hidden');

    if (perfilSelecionadoAtual === 'paciente') {
        document.getElementById('area-paciente').classList.remove('hidden');
    } else if (perfilSelecionadoAtual === 'medico') {
        document.getElementById('area-medico').classList.remove('hidden');
    } else if (perfilSelecionadoAtual === 'gestao-posto') {
        document.getElementById('area-gestao-posto').classList.remove('hidden');
    } else if (perfilSelecionadoAtual === 'gestao-sus') {
        document.getElementById('area-gestao-sus').classList.remove('hidden');
    }
}

function sairSessao() {
    voltarInicio();
}

// Modal de Campanhas
function abrirCardCampanha(idCampanha) {
    const info = dadosCampanhas[idCampanha];
    if (!info) return;

    document.getElementById('campanha-titulo').innerText = info.titulo;
    document.getElementById('campanha-icone-box').className = `p-2.5 rounded-xl ${info.corBox}`;
    document.getElementById('campanha-icone-box').innerHTML = `<i data-lucide="info" class="w-6 h-6"></i>`;
    document.getElementById('campanha-causa').innerText = info.causa;
    document.getElementById('campanha-atendimento').innerText = info.atendimento;

    const listaExames = document.getElementById('campanha-exames');
    listaExames.innerHTML = '';
    info.exames.forEach(exame => {
        const li = document.createElement('li');
        li.innerText = exame;
        listaExames.appendChild(li);
    });

    lucide.createIcons();
    document.getElementById('modal-campanha').classList.remove('hidden');
}

function fecharModalCampanha() {
    document.getElementById('modal-campanha').classList.add('hidden');
}

// Sub-abas da Gestão do Posto
function switchAbaPosto(abaId) {
    document.querySelectorAll('.subaba-posto').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.subnav-posto-btn').forEach(btn => btn.classList.remove('active'));

    const target = document.getElementById('aba-posto-' + abaId);
    if (target) target.classList.remove('hidden');

    const btn = document.getElementById('btn-posto-' + abaId);
    if (btn) btn.classList.add('active');
}

function marcarAgendamentoLocal(btnElement) {
    btnElement.className = "bg-emerald-700 text-white font-semibold px-2.5 py-1 rounded text-[11px] cursor-default";
    btnElement.innerText = "Agendado ✓";
    btnElement.disabled = true;
}

function cadastrarMedico() {
    alert("Médico cadastrado com sucesso no sistema local da unidade.");
    document.getElementById('cad-med-nome').value = '';
    document.getElementById('cad-med-crm').value = '';
    document.getElementById('cad-med-esp').value = '';
}

function cadastrarPaciente() {
    alert("Paciente cadastrado com sucesso no sistema local da unidade.");
    document.getElementById('cad-pac-nome').value = '';
    document.getElementById('cad-pac-cpf').value = '';
    document.getElementById('cad-pac-sus').value = '';
    document.getElementById('cad-pac-tel').value = '';
}

// Modal Prontuário Médico
function abrirHistoricoPaciente(nome, cpf) {
    document.getElementById('pront-nome').innerText = nome;
    document.getElementById('pront-cpf').innerText = cpf;
    document.getElementById('modal-prontuario').classList.remove('hidden');
}

function fecharModalProntuario() {
    document.getElementById('modal-prontuario').classList.add('hidden');
}