
import React from 'react';
import { AnalysisData, Ngram, TopPalabraConPorcentaje } from '../types';
import StatCard from './StatCard';
import ActivityChart from './ActivityChart';
import ParticipantPieChart from './ParticipantPieChart';
import SystemMessageChart from './SystemMessageChart';

interface DashboardProps {
    data: AnalysisData;
    onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onReset }) => {
    const { resumen, metadata, participantes, actividad, mensajes_sistema, analisis_palabras, patrones_linguisticos } = data;
    
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Reporte de Análisis de Chat</h1>
                    <p className="text-slate-400">Archivo: <span className="font-semibold text-brand-whatsapp">{metadata.archivo}</span></p>
                </div>
                <button
                    onClick={onReset}
                    className="mt-4 md:mt-0 px-5 py-2.5 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 0h10.5c.621 0 1.125-.504 1.125-1.125v-11.25c0-.621-.504-1.125-1.125-1.125H6.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    Analizar otro chat
                </button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <StatCard title="Total de Mensajes" value={resumen.total_mensajes.toLocaleString('es-ES')} />
                <StatCard title="Participantes" value={resumen.participantes} />
                <StatCard title="Mensajes de Usuario" value={resumen.mensajes_usuarios.toLocaleString('es-ES')} />
                <StatCard title="Mensajes del Sistema" value={resumen.mensajes_sistema.toLocaleString('es-ES')} />
                <StatCard title="Periodo" value={`${formatDate(resumen.rango_fechas.inicio)} - ${formatDate(resumen.rango_fechas.fin)}`} isSmallText={true} />
            </div>

            {/* Participants Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-4">Mensajes por Participante</h2>
                    <ParticipantPieChart data={participantes.mensajes_por_participante} />
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {participantes.lista.map(nombre => {
                        const pData = participantes.analisis_detallado[nombre];
                        return (
                            <div key={nombre} className="bg-slate-800 p-6 rounded-xl shadow-lg">
                                <h3 className="text-lg font-bold text-cyan-400 truncate">{pData.autor}</h3>
                                <div className="mt-4 space-y-2 text-sm">
                                    <p className="flex justify-between"><span>Total Mensajes:</span> <span className="font-bold">{pData.total_mensajes.toLocaleString('es-ES')}</span></p>
                                    <p className="flex justify-between"><span>Total Palabras:</span> <span className="font-bold">{pData.total_palabras.toLocaleString('es-ES')}</span></p>
                                    <p className="flex justify-between"><span>Palabras Únicas:</span> <span className="font-bold">{pData.palabras_unicas.toLocaleString('es-ES')}</span></p>
                                    <div className="pt-2">
                                        <h4 className="font-semibold text-slate-300 mb-1">Top Palabras:</h4>
                                        <ul className="text-xs text-slate-400 list-disc list-inside">
                                            {pData.top_palabras.slice(0, 5).map(p => <li key={p.palabra}>{p.palabra} <span className="text-slate-500">({p.frecuencia})</span></li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Activity and System Messages */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-4">Actividad por Hora del Día</h2>
                    <p className="text-sm text-slate-400 -mt-3 mb-4">Hora más activa: <span className="font-bold text-cyan-400">{actividad.hora_mas_activa}:00</span></p>
                    <ActivityChart data={actividad.por_hora} />
                </div>
                <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-4">Tipos de Mensajes del Sistema</h2>
                     <SystemMessageChart data={mensajes_sistema.por_tipo} descriptions={mensajes_sistema.descripcion} />
                </div>
            </div>

            {/* Word and Pattern Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-4">Top 30 Palabras</h2>
                    <WordTable data={analisis_palabras.top_30} />
                </div>
                 <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-4">Top Bigramas</h2>
                    <NgramTable data={patrones_linguisticos.bigramas.top_20 || []} />
                </div>
                 <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-4">Top Trigramas</h2>
                    <NgramTable data={patrones_linguisticos.trigramas.top_15 || []} />
                </div>
            </div>

        </div>
    );
};


const WordTable: React.FC<{data: TopPalabraConPorcentaje[]}> = ({data}) => (
    <div className="h-96 overflow-y-auto pr-2">
        <ul className="space-y-1">
            {data.map(({ palabra, frecuencia, porcentaje }, index) => (
                <li key={palabra+index} className="flex items-center justify-between text-sm p-1.5 rounded-md hover:bg-slate-700/50">
                    <div className="flex items-center">
                        <span className="text-slate-500 font-mono text-xs w-6">{index+1}.</span>
                        <span className="text-slate-300">{palabra}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                         <span className="text-xs text-slate-500">{porcentaje.toFixed(2)}%</span>
                        <span className="font-semibold text-cyan-400 w-8 text-right">{frecuencia}</span>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

const NgramTable: React.FC<{data: Ngram[]}> = ({data}) => (
     <div className="h-96 overflow-y-auto pr-2">
        <ul className="space-y-1">
            {data.map(({ texto, frecuencia }, index) => (
                <li key={texto+index} className="flex items-center justify-between text-sm p-1.5 rounded-md hover:bg-slate-700/50">
                    <div className="flex items-center">
                        <span className="text-slate-500 font-mono text-xs w-6">{index+1}.</span>
                        <span className="text-slate-300">{texto}</span>
                    </div>
                    <span className="font-semibold text-cyan-400 w-8 text-right">{frecuencia}</span>
                </li>
            ))}
        </ul>
    </div>
);


export default Dashboard;
