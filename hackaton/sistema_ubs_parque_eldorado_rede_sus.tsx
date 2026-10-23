import React, { useState } from 'react';
import { 
  Building2, Calendar, Clock, MapPin, Phone, Shield, Search, UserCheck, 
  Syringe, Heart, Stethoscope, AlertCircle, FileText, CheckCircle2, 
  XCircle, Filter, Mail, Bot, RefreshCw, Send, Activity, Users, User,
  ChevronRight, Lock, Bell, Sparkles, Navigation, Plus, Eye, BarChart3, Info
} from 'lucide-react';

// --- INITIAL MOCK DATA ---

const INITIAL_VACCINES = [
  { id: 1, name: "Gripe (Influenza)", stock: "Disponível", count: 145, target: "Geral (A partir de 6 meses)", schedule: "08:00 - 16:30" },
  { id: 2, name: "COVID-19 Bivalente", stock: "Disponível", count: 88, target: "Adultos e Idosos", schedule: "08:00 - 16:30" },
  { id: 3, name: "DTPa (Tétano, Difteria, Coqueluche)", stock: "Poucas unidades", count: 12, target: "Gestantes e Profissionais de Saúde", schedule: "08:00 - 12:00" },
  { id: 4, name: "Dengue (Qdenga)", stock: "Indisponível", count: 0, target: "Crianças de 10 a 14 anos", schedule: "Aguardando lote" },
  { id: 5, name: "Febre Amarela", stock: "Disponível", count: 60, target: "Crianças e Viajantes", schedule: "08:00 - 16:30" },
  { id: 6, name: "Hepatite B", stock: "Disponível", count: 110, target: "Público Geral", schedule: "08:00 - 16:30" },
];

const INITIAL_CAMPAIGNS = [
  { id: 'outubro', title: "Outubro Rosa", category: "Prevenção do Câncer de Mama", desc: "Exames preventivos, autoexame e mamografias gratuitas encaminhadas para mulheres acima de 40 anos.", color: "bg-pink-50 border-pink-200 text-pink-700", badge: "bg-pink-500" },
  { id: 'novembro', title: "Novembro Azul", category: "Saúde do Homem", desc: "Conscientização sobre o câncer de próstata, exames laboratoriais e consultas de rotina masculinas.", color: "bg-blue-50 border-blue-200 text-blue-700", badge: "bg-blue-600" },
  { id: 'setembro', title: "Setembro Amarelo", category: "Saúde Mental", desc: "Acolhimento psicológico, palestras educativas e valorização da vida no posto e unidades parceiras.", color: "bg-amber-50 border-amber-200 text-amber-700", badge: "bg-amber-500" },
  { id: 'tea', title: "Abril Azul (TEA)", category: "Conscientização do Autismo", desc: "Suporte familiar, suporte a diagnósticos precoces e ações de inclusão na rede de atenção básica.", color: "bg-indigo-50 border-indigo-200 text-indigo-700", badge: "bg-indigo-600" },
  { id: 'gripe', title: "Campanha Multivacinação", category: "Imunização", desc: "Mantenha sua caderneta atualizada. Atendimento especial aos sábados de mobilização em Eldorado do Sul.", color: "bg-emerald-50 border-emerald-200 text-emerald-700", badge: "bg-emerald-600" }
];

const INITIAL_DOCTORS = [
  { id: 1, name: "Dra. Mariana Costa", crm: "CRM/RS 48291", spec: "Clínica Geral", type: "Posto de Saúde", unit: "UBS Parque Eldorado", hours: "Segunda a Sexta - 08:00 às 14:00" },
  { id: 2, name: "Dr. Roberto Silva", crm: "CRM/RS 35120", spec: "Pediatria", type: "Posto de Saúde", unit: "UBS Parque Eldorado", hours: "Terça e Quinta - 09:00 às 15:00" },
  { id: 3, name: "Dr. André Santos", crm: "CRM/RS 51044", spec: "Cardiologia", type: "Rede SUS Regional", unit: "Hospital Geral Eldorado / Policlínica", hours: "Quarta e Sexta - 13:00 às 18:00" },
  { id: 4, name: "Dra. Camila Albuquerque", crm: "CRM/RS 42910", spec: "Ginecologia e Obstetrícia", type: "Posto de Saúde", unit: "UBS Parque Eldorado", hours: "Segunda a Quinta - 08:00 às 12:00" },
  { id: 5, name: "Dr. Fernando Mendonça", crm: "CRM/RS 29831", spec: "Ortopedia", type: "Rede SUS Regional", unit: "Centro de Especialidades SUS", hours: "Segunda a Quarta - 10:00 às 16:00" },
];

const INITIAL_PATIENTS = [
  { id: 1, name: "João Pedro Alves", cpf: "123.456.789-00", sus: "898 1234 5678 0001", phone: "(51) 99876-1234", email: "joao.alves@email.com", address: "Rua das Acácias, 102 - Parque Eldorado" },
  { id: 2, name: "Maria Clara Souza", cpf: "234.567.890-11", sus: "898 2345 6789 0002", phone: "(51) 98123-4567", email: "maria.souza@email.com", address: "Av. Eldorado, 450 - Parque Eldorado" },
  { id: 3, name: "Carlos Eduardo Lima", cpf: "345.678.901-22", sus: "898 3456 7890 0003", phone: "(51) 99345-6789", email: "carlos.lima@email.com", address: "Rua dos Pinheiros, 88 - Parque Eldorado" },
  { id: 4, name: "Ana Luíza Ferreira", cpf: "456.789.012-33", sus: "898 4567 8901 0004", phone: "(51) 98877-6655", email: "ana.ferreira@email.com", address: "Rua do Comércio, 12 - Eldorado do Sul" },
];

const INITIAL_WAITING_LIST = [
  { id: 101, patientName: "João Pedro Alves", cpf: "123.456.789-00", sus: "898 1234 5678 0001", email: "joao.alves@email.com", spec: "Cardiologia", priority: "Urgente", requestedAt: "2026-10-10", status: "Em Fila" },
  { id: 102, patientName: "Maria Clara Souza", cpf: "234.567.890-11", sus: "898 2345 6789 0002", email: "maria.souza@email.com", spec: "Ginecologia e Obstetrícia", priority: "Alta", requestedAt: "2026-10-12", status: "Em Fila" },
  { id: 103, patientName: "Carlos Eduardo Lima", cpf: "345.678.901-22", sus: "898 3456 7890 0003", email: "carlos.lima@email.com", spec: "Ortopedia", priority: "Média", requestedAt: "2026-10-15", status: "Em Fila" },
  { id: 104, patientName: "Ana Luíza Ferreira", cpf: "456.789.012-33", sus: "898 4567 8901 0004", email: "ana.ferreira@email.com", spec: "Pediatria", priority: "Baixa", requestedAt: "2026-10-18", status: "Em Fila" },
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('public');

  // Shared States
  const [vaccines] = useState(INITIAL_VACCINES);
  const [campaigns] = useState(INITIAL_CAMPAIGNS);
  const [doctors] = useState(INITIAL_DOCTORS);
  const [patients] = useState(INITIAL_PATIENTS);
  const [waitingList, setWaitingList] = useState(INITIAL_WAITING_LIST);
  const [aiLogs, setAiLogs] = useState([
    { id: 1, timestamp: "2026-10-23 09:15", patient: "Lucas Oliveira", doctor: "Dr. André Santos", spec: "Cardiologia", email: "lucas.o@email.com", date: "26/10/2026 14:00", status: "Enviado e Confirmado" }
  ]);

  // Public Search
  const [vaccineSearch, setVaccineSearch] = useState('');

  // Doctor Auth & Search
  const [docAuth, setDocAuth] = useState({ loggedIn: true, name: 'Dra. Mariana Costa', crm: 'CRM/RS 48291', type: 'Posto de Saúde', unit: 'UBS Parque Eldorado' });
  const [docSearch, setDocSearch] = useState('');
  const [docAppointments, setDocAppointments] = useState([
    { id: 1, patient: "João Pedro Alves", cpf: "123.456.789-00", time: "08:30", reason: "Retorno de Exames Cardiológicos", status: "Aguardando" },
    { id: 2, patient: "Maria Clara Souza", cpf: "234.567.890-11", time: "09:15", reason: "Consulta Pré-Natal de Rotina", status: "Em Atendimento" },
    { id: 3, patient: "Carlos Eduardo Lima", cpf: "345.678.901-22", time: "10:00", reason: "Renovação de Receita Médica", status: "Concluído" },
  ]);

  // Patient Auth & Search
  const [patientAuth, setPatientAuth] = useState({ loggedIn: true, name: 'João Pedro Alves', email: 'joao.alves@email.com' });
  const [patientSearch, setPatientSearch] = useState('');
  const [patientAppointments, setPatientAppointments] = useState([
    { id: 1, doctor: "Dra. Mariana Costa", spec: "Clínica Geral", location: "UBS Parque Eldorado", date: "28/10/2026 - 09:30", status: "Confirmado" },
    { id: 2, doctor: "Dr. André Santos", spec: "Cardiologia", location: "Hospital Geral / SUS Regional", date: "05/11/2026 - 14:00", status: "Agendado via IA" }
  ]);

  // Unit Admin Search
  const [unitPatientSearch, setUnitPatientSearch] = useState('');

  // SUS Regulation Filters
  const [susFilterSpec, setSusFilterSpec] = useState('Todas');
  const [susFilterPriority, setSusFilterPriority] = useState('Todas');

  // AI Simulation State
  const [isSimulating, setIsSimulating] = useState(false);

  // Campaign Modal
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // --- ACTIONS ---

  const handleDocLogin = (e) => {
    e.preventDefault();
    setDocAuth(prev => ({ ...prev, loggedIn: true }));
  };

  const handlePatientLogin = (e) => {
    e.preventDefault();
    setPatientAuth(prev => ({ ...prev, loggedIn: true }));
  };

  const runAiScheduler = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const pending = waitingList.filter(item => item.status === "Em Fila");
      if (pending.length === 0) {
        setIsSimulating(false);
        return;
      }

      const priorities = { Urgente: 1, Alta: 2, Média: 3, Baixa: 4 };
      const sorted = [...pending].sort((a, b) => priorities[a.priority] - priorities[b.priority]);
      const target = sorted[0];

      setWaitingList(prev => prev.map(item => item.id === target.id ? { ...item, status: "Agendado pela IA" } : item));

      const matchDoc = doctors.find(d => d.spec === target.spec) || doctors[0];
      const newLog = {
        id: Date.now(),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        patient: target.patientName,
        doctor: matchDoc.name,
        spec: target.spec,
        email: target.email,
        date: "29/10/2026 10:30",
        status: "Enviado e Confirmado"
      };

      setAiLogs(prev => [newLog, ...prev]);
      setIsSimulating(false);
    }, 1000);
  };

  const cancelPatientAppointment = (id) => {
    setPatientAppointments(prev => prev.filter(a => a.id !== id));
  };

  const changeDocAppStatus = (id, newStatus) => {
    setDocAppointments(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* HEADER & TOP NAV BAR */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-base sm:text-lg tracking-tight text-white block leading-tight">
                  UBS Parque Eldorado
                </span>
                <span className="text-[10px] sm:text-xs text-blue-400 font-semibold tracking-wider uppercase">
                  Rede SUS Eldorado do Sul
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { id: 'public', label: 'Início & Vacinas', icon: Activity },
                { id: 'doctor', label: 'Área Médica', icon: Stethoscope },
                { id: 'patient', label: 'Área do Paciente', icon: User },
                { id: 'unit_admin', label: 'Secretaria Unidade', icon: Shield },
                { id: 'sus_regulation', label: 'Regulação SUS', icon: Filter },
                { id: 'ai_scheduler', label: 'Robô IA', icon: Bot, highlight: true }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow' 
                        : item.highlight 
                        ? 'bg-blue-950 text-blue-300 hover:bg-blue-900 border border-blue-700' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Mobile Navigation Scroll */}
          <div className="flex lg:hidden overflow-x-auto py-2 gap-2 border-t border-slate-800">
            {[
              { id: 'public', label: 'Início & Vacinas' },
              { id: 'doctor', label: 'Área Médica' },
              { id: 'patient', label: 'Área do Paciente' },
              { id: 'unit_admin', label: 'Secretaria' },
              { id: 'sus_regulation', label: 'Regulação SUS' },
              { id: 'ai_scheduler', label: 'Robô IA' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap ${
                  activeTab === item.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 1: INÍCIO / VACINAS / CAMPANHAS */}
        {/* -------------------------------------------------------------------------- */}
        {activeTab === 'public' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-2xl shadow-xl overflow-hidden text-white relative">
              <div className="p-6 sm:p-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-4">
                  <span className="inline-flex items-center gap-1.5 bg-blue-500/30 text-blue-200 border border-blue-400/30 text-xs font-semibold px-3 py-1 rounded-full">
                    <Building2 className="w-3.5 h-3.5" /> Posto de Saúde Integrado
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    UBS Parque Eldorado
                  </h1>
                  <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl">
                    Atendimento preventivo, agendamento facilitado e integração com a Rede SUS de Eldorado do Sul - RS.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 text-blue-100">
                    <div className="flex items-center gap-2 bg-blue-950/40 p-2.5 rounded-lg border border-blue-700/50">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Parque Eldorado, Eldorado do Sul - RS</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-950/40 p-2.5 rounded-lg border border-blue-700/50">
                      <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Seg. a Sex.: 07:00 às 17:00</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-950/40 p-2.5 rounded-lg border border-blue-700/50">
                      <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>(51) 3481-0000 / SAMU: 192</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-950/40 p-2.5 rounded-lg border border-blue-700/50">
                      <Navigation className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Sala de Vacinas sem fechar ao meio-dia</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 text-center space-y-3">
                  <div className="bg-blue-600/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-white">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base">Atendimento do Dia</h3>
                  <p className="text-xs text-blue-100">Triagem rápida e atendimento ambulatorial para moradores cadastrados.</p>
                  <button onClick={() => setActiveTab('patient')} className="w-full bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs py-2.5 px-4 rounded-lg shadow transition">
                    Acessar Área do Paciente
                  </button>
                </div>
              </div>
            </div>

            {/* Vaccines Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-blue-700 font-bold">
                    <Syringe className="w-5 h-5" />
                    <h2 className="text-xl">Estoque de Vacinas no Posto</h2>
                  </div>
                  <p className="text-xs text-slate-500">Acompanhe a disponibilidade em tempo real para aplicação na UBS</p>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar vacina..."
                    value={vaccineSearch}
                    onChange={(e) => setVaccineSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vaccines
                  .filter(v => v.name.toLowerCase().includes(vaccineSearch.toLowerCase()))
                  .map((v) => {
                    const isAvailable = v.stock === 'Disponível';
                    const isLow = v.stock === 'Poucas unidades';
                    return (
                      <div key={v.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-bold text-slate-900 text-sm">{v.name}</h3>
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                              isAvailable ? 'bg-emerald-100 text-emerald-800' :
                              isLow ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {v.stock}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600"><span className="font-semibold text-slate-700">Público:</span> {v.target}</p>
                          <p className="text-xs text-slate-600"><span className="font-semibold text-slate-700">Horário:</span> {v.schedule}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
                          <span className="text-slate-500">Doses disponíveis:</span>
                          <span className="font-bold text-slate-800">{v.count} doses</span>
                        </div>
                      </div>
                    );
                })}
              </div>
            </div>

            {/* Campaigns */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Heart className="w-5 h-5 text-red-500" />
                <h2 className="text-xl">Campanhas de Saúde Preventiva</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaigns.map((c) => (
                  <div key={c.id} className={`border rounded-xl p-5 flex flex-col justify-between shadow-sm hover:shadow transition ${c.color}`}>
                    <div className="space-y-3">
                      <span className={`text-[10px] uppercase font-bold text-white px-2.5 py-0.5 rounded-full inline-block ${c.badge}`}>
                        {c.category}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">{c.title}</h3>
                      <p className="text-xs text-slate-700 leading-relaxed">{c.desc}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedCampaign(c)}
                      className="mt-4 w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs py-2 rounded-lg transition"
                    >
                      Ver Programação
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 2: ÁREA DO MÉDICO */}
        {/* -------------------------------------------------------------------------- */}
        {activeTab === 'doctor' && (
          <div className="space-y-6 animate-fadeIn">
            {!docAuth.loggedIn ? (
              <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
                <div className="text-center space-y-2">
                  <div className="bg-blue-100 text-blue-700 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Acesso do Profissional Médico</h2>
                  <p className="text-xs text-slate-500">Selecione seu vínculo e CRM para iniciar</p>
                </div>

                <form onSubmit={handleDocLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Vínculo</label>
                    <select 
                      value={docAuth.type}
                      onChange={(e) => setDocAuth({ ...docAuth, type: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      <option value="Posto de Saúde">Médico do Posto de Saúde Local</option>
                      <option value="Rede SUS Regional">Médico Especialista da Rede SUS Regional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      value={docAuth.name}
                      onChange={(e) => setDocAuth({ ...docAuth, name: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">CRM</label>
                    <input 
                      type="text" 
                      required
                      value={docAuth.crm}
                      onChange={(e) => setDocAuth({ ...docAuth, crm: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>

                  <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-3 rounded-lg shadow transition">
                    Entrar no Consultório
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-slate-900 text-white rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">{docAuth.type}</span>
                      <span className="text-xs text-slate-400">{docAuth.unit}</span>
                    </div>
                    <h2 className="text-2xl font-bold mt-1">{docAuth.name}</h2>
                    <p className="text-xs text-slate-300">{docAuth.crm} • Prontuário Eletrônico e Atendimento</p>
                  </div>
                  <button onClick={() => setDocAuth({ ...docAuth, loggedIn: false })} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-2 rounded-lg">
                    Trocar Médico / Sair
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Agenda de Pacientes do Dia</h3>
                      <p className="text-xs text-slate-500">Filtre ou busque pacientes agendados</p>
                    </div>

                    <div className="relative w-full sm:w-80">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Buscar por Paciente ou CPF..."
                        value={docSearch}
                        onChange={(e) => setDocSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {docAppointments
                      .filter(app => app.patient.toLowerCase().includes(docSearch.toLowerCase()) || app.cpf.includes(docSearch))
                      .map((app) => (
                        <div key={app.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                          <div className="flex justify-between items-start">
                            <span className="bg-blue-100 text-blue-800 font-bold text-xs px-2 py-0.5 rounded">
                              {app.time}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              app.status === 'Aguardando' ? 'bg-amber-100 text-amber-800' :
                              app.status === 'Em Atendimento' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {app.status}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{app.patient}</h4>
                            <p className="text-[11px] text-slate-500">CPF: {app.cpf}</p>
                            <p className="text-xs text-slate-700 mt-2"><span className="font-semibold">Motivo:</span> {app.reason}</p>
                          </div>

                          <div className="pt-2 border-t border-slate-200 flex flex-col gap-1.5">
                            <button 
                              onClick={() => changeDocAppStatus(app.id, 'Em Atendimento')}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-1.5 rounded transition"
                            >
                              Chamar Paciente
                            </button>
                            <button 
                              onClick={() => changeDocAppStatus(app.id, 'Concluído')}
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-1.5 rounded transition"
                            >
                              Concluir Atendimento
                            </button>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 3: ÁREA DO PACIENTE */}
        {/* -------------------------------------------------------------------------- */}
        {activeTab === 'patient' && (
          <div className="space-y-6 animate-fadeIn">
            {!patientAuth.loggedIn ? (
              <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
                <div className="text-center space-y-2">
                  <div className="bg-blue-100 text-blue-700 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Portal do Paciente</h2>
                  <p className="text-xs text-slate-500">Acesse seus agendamentos e consulte profissionais</p>
                </div>

                <form onSubmit={handlePatientLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail Cadastrado</label>
                    <input 
                      type="email" 
                      required
                      value={patientAuth.email}
                      onChange={(e) => setPatientAuth({ ...patientAuth, email: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>

                  <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-3 rounded-lg shadow transition">
                    Entrar no Portal
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow">
                  <div>
                    <span className="text-xs text-blue-200 uppercase font-bold tracking-wider">Cartão SUS Ativo</span>
                    <h2 className="text-2xl font-bold">{patientAuth.name}</h2>
                    <p className="text-xs text-blue-100">{patientAuth.email} • Cartão SUS: 898 1234 5678 0001</p>
                  </div>
                  <button onClick={() => setPatientAuth({ ...patientAuth, loggedIn: false })} className="text-xs bg-white/20 hover:bg-white/30 text-white font-semibold px-3 py-2 rounded-lg">
                    Sair
                  </button>
                </div>

                {/* Patient Appointments */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                  <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Minhas Consultas e Exames Marcados
                  </h3>

                  {patientAppointments.length === 0 ? (
                    <p className="text-xs text-slate-500">Nenhuma consulta marcada no momento.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {patientAppointments.map((app) => (
                        <div key={app.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex flex-col justify-between space-y-3">
                          <div>
                            <div className="flex justify-between items-start">
                              <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded">
                                {app.status}
                              </span>
                              <span className="text-xs font-bold text-blue-700">{app.date}</span>
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm mt-2">{app.doctor}</h4>
                            <p className="text-xs text-slate-600">{app.spec}</p>
                            <p className="text-xs text-slate-500 mt-1"><span className="font-medium">Local:</span> {app.location}</p>
                          </div>

                          <div className="pt-2 border-t border-slate-200">
                            <button 
                              onClick={() => cancelPatientAppointment(app.id)}
                              className="w-full text-red-600 hover:bg-red-50 text-xs font-bold py-1.5 rounded transition border border-red-200"
                            >
                              Cancelar Agendamento
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Available Doctors */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Buscar Médicos e Especialistas SUS</h3>
                      <p className="text-xs text-slate-500">Consulte especialidades atendidas no município</p>
                    </div>

                    <div className="relative w-full sm:w-80">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Buscar médico ou especialidade..."
                        value={patientSearch}
                        onChange={(e) => setPatientSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctors
                      .filter(d => d.name.toLowerCase().includes(patientSearch.toLowerCase()) || d.spec.toLowerCase().includes(patientSearch.toLowerCase()))
                      .map((doc) => (
                        <div key={doc.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              {doc.spec}
                            </span>
                            <h4 className="font-bold text-slate-900 text-sm mt-1">{doc.name}</h4>
                            <p className="text-[11px] text-slate-500">{doc.crm}</p>
                          </div>

                          <div className="text-xs text-slate-600 space-y-1">
                            <p><span className="font-semibold text-slate-700">Local:</span> {doc.unit}</p>
                            <p><span className="font-semibold text-slate-700">Atendimento:</span> {doc.hours}</p>
                          </div>

                          <button 
                            onClick={() => alert(`Solicitação para consulta com ${doc.name} enviada à Regulação SUS.`)}
                            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-2 rounded-lg transition"
                          >
                            Solicitar Vaga
                          </button>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 4: SECRETARIA LOCAL DO POSTO */}
        {/* -------------------------------------------------------------------------- */}
        {activeTab === 'unit_admin' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <Shield className="w-5 h-5 text-blue-700" />
                    <h2 className="text-xl">Secretaria Local - UBS Parque Eldorado</h2>
                  </div>
                  <p className="text-xs text-slate-500">Gerenciamento administrativo, escalas profissionais e cadastros locais</p>
                </div>
                <span className="bg-slate-100 text-slate-700 font-semibold text-xs px-3 py-1.5 rounded-lg border border-slate-300">
                  Secretaria Municipal de Saúde
                </span>
              </div>

              {/* Duty Schedule Table */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Escala Médica Atual</h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-800">
                      <tr>
                        <th className="p-3">Médico</th>
                        <th className="p-3">Especialidade</th>
                        <th className="p-3">Escala</th>
                        <th className="p-3">Unidade / Tipo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {doctors.map((d) => (
                        <tr key={d.id} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-slate-900">{d.name}</td>
                          <td className="p-3">{d.spec}</td>
                          <td className="p-3">{d.hours}</td>
                          <td className="p-3">
                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold text-[10px]">
                              {d.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Patient Cadastral List (NO MEDICAL HISTORY) */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Cadastros de Pacientes da Unidade</h3>
                    <p className="text-[11px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-1">
                      <Lock className="w-3 h-3 inline mr-1" /> Sigilo Respeitado: Histórico clínico protegido indisponível para visão administrativa
                    </p>
                  </div>

                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Buscar paciente por nome ou CPF..."
                      value={unitPatientSearch}
                      onChange={(e) => setUnitPatientSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patients
                    .filter(p => p.name.toLowerCase().includes(unitPatientSearch.toLowerCase()) || p.cpf.includes(unitPatientSearch))
                    .map((pat) => (
                      <div key={pat.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
                        <h4 className="font-bold text-slate-900 text-sm">{pat.name}</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                          <p><span className="font-medium text-slate-700">CPF:</span> {pat.cpf}</p>
                          <p><span className="font-medium text-slate-700">Cartão SUS:</span> {pat.sus}</p>
                          <p><span className="font-medium text-slate-700">Telefone:</span> {pat.phone}</p>
                          <p><span className="font-medium text-slate-700">E-mail:</span> {pat.email}</p>
                        </div>
                        <p className="text-xs text-slate-600 pt-1 border-t border-slate-200">
                          <span className="font-medium text-slate-700">Endereço:</span> {pat.address}
                        </p>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 5: CENTRAL DE REGULAÇÃO DO SUS */}
        {/* -------------------------------------------------------------------------- */}
        {activeTab === 'sus_regulation' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-semibold">Total na Fila de Espera</span>
                <p className="text-3xl font-extrabold text-blue-900">{waitingList.length}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-semibold">Tempo Médio da Regulação</span>
                <p className="text-3xl font-extrabold text-indigo-900">4.2 dias</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-semibold">Vagas Livres na Rede</span>
                <p className="text-3xl font-extrabold text-emerald-700">38 vagas</p>
              </div>
            </div>

            {/* Central Waiting List */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Fila Regional de Espera SUS</h2>
                  <p className="text-xs text-slate-500">Regulação unificada por gravidade e ordem cronológica</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <select 
                    value={susFilterSpec}
                    onChange={(e) => setSusFilterSpec(e.target.value)}
                    className="border border-slate-300 rounded-lg p-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Todas">Todas Especialidades</option>
                    <option value="Cardiologia">Cardiologia</option>
                    <option value="Ginecologia e Obstetrícia">Ginecologia</option>
                    <option value="Ortopedia">Ortopedia</option>
                    <option value="Pediatria">Pediatria</option>
                  </select>

                  <select 
                    value={susFilterPriority}
                    onChange={(e) => setSusFilterPriority(e.target.value)}
                    className="border border-slate-300 rounded-lg p-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Todas">Todas Prioridades</option>
                    <option value="Urgente">Urgente</option>
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-800">
                    <tr>
                      <th className="p-3">Paciente</th>
                      <th className="p-3">CPF</th>
                      <th className="p-3">Especialidade</th>
                      <th className="p-3">Prioridade</th>
                      <th className="p-3">Data de Entrada</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {waitingList
                      .filter(item => susFilterSpec === 'Todas' || item.spec === susFilterSpec)
                      .filter(item => susFilterPriority === 'Todas' || item.priority === susFilterPriority)
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-slate-900">{item.patientName}</td>
                          <td className="p-3 text-slate-500">{item.cpf}</td>
                          <td className="p-3 font-medium">{item.spec}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              item.priority === 'Urgente' ? 'bg-red-100 text-red-800' :
                              item.priority === 'Alta' ? 'bg-orange-100 text-orange-800' :
                              item.priority === 'Média' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {item.priority}
                            </span>
                          </td>
                          <td className="p-3">{item.requestedAt}</td>
                          <td className="p-3 font-semibold text-slate-800">{item.status}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 6: SIMULADOR ROBÔ DE IA PARA AGENDAMENTO */}
        {/* -------------------------------------------------------------------------- */}
        {activeTab === 'ai_scheduler' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Assistente Virtual de Regulação
                    </span>
                    <span className="text-xs text-slate-400">Motor de Agendamento Automático</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Cruzamento Inteligente de Vagas SUS</h2>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                    O robô identifica os casos prioritários na fila de espera, aloca a consulta com médicos disponíveis e encaminha a notificação via e-mail para o paciente.
                  </p>
                </div>

                <button
                  onClick={runAiScheduler}
                  disabled={isSimulating}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Processando Fila...
                    </>
                  ) : (
                    <>
                      <Bot className="w-4 h-4" /> Executar Agendamento por IA
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Notification Log */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Log de E-mails Enviados aos Pacientes
                </h3>
                <span className="text-xs text-slate-500 font-medium">Histórico recente</span>
              </div>

              <div className="space-y-3">
                {aiLogs.map((log) => (
                  <div key={log.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {log.status}
                        </span>
                        <span className="text-xs text-slate-400">{log.timestamp}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Paciente: {log.patient} &rarr; Profissional: {log.doctor} ({log.spec})
                      </h4>
                      <p className="text-xs text-slate-600">
                        E-mail de confirmação enviado para: <span className="font-mono text-blue-700">{log.email}</span>
                      </p>
                    </div>

                    <div className="text-right sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Horário Reservado:</span>
                      <span className="font-bold text-slate-800 text-xs">{log.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* CAMPAIGN MODAL */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{selectedCampaign.category}</span>
                <h3 className="text-xl font-bold text-slate-900">{selectedCampaign.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedCampaign(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedCampaign.desc}
            </p>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
              <p className="font-semibold text-slate-800">Atividades no Posto:</p>
              <p className="text-slate-600">• Orientação individualizada e distribuição de materiais informativos.</p>
              <p className="text-slate-600">• Exames preventivos com atendimento na UBS Parque Eldorado.</p>
            </div>

            <button
              onClick={() => setSelectedCampaign(null)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-lg transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-medium text-slate-700">UBS Parque Eldorado & Sistema Unificado do SUS - Eldorado do Sul / RS</p>
          <p>Protótipo Interativo de Gestão em Saúde Pública</p>
        </div>
      </footer>

    </div>
  );
}