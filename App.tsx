
import React, { useState, useCallback } from 'react';
import { AnalysisData } from './types';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import Spinner from './components/Spinner';

// Mock API response data from the user prompt
const mockApiResponse: AnalysisData = {
    "metadata": { "archivo": "_chat 2.txt", "estado": "éxito", "fecha_analisis": "2025-11-07T17:17:24.188637", "version_api": "2.0.0" },
    "resumen": { "total_mensajes": 2757, "mensajes_usuarios": 2348, "mensajes_sistema": 409, "participantes": 2, "rango_fechas": { "inicio": "2024-09-16T09:19:16", "fin": "2025-11-07T12:45:59" } },
    "participantes": { "lista": ["matias sapa", "Juan Jaramillo"], "mensajes_por_participante": { "matias sapa": 1364, "Juan Jaramillo": 984 }, "analisis_detallado": { "matias sapa": { "autor": "matias sapa", "total_mensajes": 1617, "total_palabras": 2888, "palabras_unicas": 745, "top_palabras": [{ "palabra": "gordo", "frecuencia": 97 }, { "palabra": "si", "frecuencia": 93 }, { "palabra": "hoy", "frecuencia": 45 }, { "palabra": "onda", "frecuencia": 44 }, { "palabra": "che", "frecuencia": 35 }, { "palabra": "hacer", "frecuencia": 34 }, { "palabra": "haces", "frecuencia": 30 }, { "palabra": "vos", "frecuencia": 27 }, { "palabra": "algo", "frecuencia": 26 }, { "palabra": "culia", "frecuencia": 23 }] }, "Juan Jaramillo": { "autor": "Juan Jaramillo", "total_mensajes": 1140, "total_palabras": 3071, "palabras_unicas": 754, "top_palabras": [{ "palabra": "si", "frecuencia": 102 }, { "palabra": "jaja", "frecuencia": 49 }, { "palabra": "estoy", "frecuencia": 40 }, { "palabra": "hilo", "frecuencia": 38 }, { "palabra": "bro", "frecuencia": 34 }, { "palabra": "voy", "frecuencia": 31 }, { "palabra": "dale", "frecuencia": 31 }, { "palabra": "culia", "frecuencia": 28 }, { "palabra": "ahora", "frecuencia": 28 }, { "palabra": "public", "frecuencia": 26 }] } } },
    "mensajes_sistema": { "total": 409, "por_tipo": { "audio": 293, "message_edited": 29, "document": 22, "view_once_message": 19, "image": 18, "view_once_photo": 14, "voice_call": 6, "video": 2, "sticker": 2, "message_deleted": 2, "missed_call": 2 }, "por_autor": {}, "descripcion": { "sticker": "Stickers enviados", "audio": "Audios/Notas de voz", "image": "Imágenes", "video": "Videos", "document": "Documentos", "contact": "Tarjetas de contacto", "location": "Ubicaciones compartidas", "view_once_video": "Videos de ver una vez", "view_once_photo": "Fotos de ver una vez", "view_once_message": "Mensajes de ver una vez", "video_call": "Videollamadas", "voice_call": "Llamadas de voz", "missed_call": "Llamadas perdidas", "message_edited": "Mensajes editados", "message_deleted": "Mensajes eliminados" } },
    "actividad": { "por_hora": { "0": 0, "1": 191, "2": 137, "3": 117, "4": 156, "5": 274, "6": 266, "7": 483, "8": 141, "9": 109, "10": 76, "11": 226, "12": 172, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0 }, "hora_mas_activa": 7, "hora_menos_activa": 0 },
    "analisis_palabras": { "total_palabras": 5959, "palabras_unicas": 1259, "promedio_por_mensaje": 2.54, "top_30": [{ "palabra": "si", "frecuencia": 195, "porcentaje": 3.27 }, { "palabra": "gordo", "frecuencia": 111, "porcentaje": 1.86 }, { "palabra": "hoy", "frecuencia": 59, "porcentaje": 0.99 }, { "palabra": "onda", "frecuencia": 57, "porcentaje": 0.96 }, { "palabra": "hacer", "frecuencia": 56, "porcentaje": 0.94 }, { "palabra": "dale", "frecuencia": 53, "porcentaje": 0.89 }, { "palabra": "culia", "frecuencia": 51, "porcentaje": 0.86 }, { "palabra": "jaja", "frecuencia": 49, "porcentaje": 0.82 }, { "palabra": "estoy", "frecuencia": 48, "porcentaje": 0.81 }, { "palabra": "che", "frecuencia": 48, "porcentaje": 0.81 }, { "palabra": "voy", "frecuencia": 45, "porcentaje": 0.76 }, { "palabra": "vos", "frecuencia": 43, "porcentaje": 0.72 }, { "palabra": "yo", "frecuencia": 39, "porcentaje": 0.65 }, { "palabra": "tengo", "frecuencia": 39, "porcentaje": 0.65 }, { "palabra": "bro", "frecuencia": 38, "porcentaje": 0.64 }, { "palabra": "hilo", "frecuencia": 38, "porcentaje": 0.64 }, { "palabra": "haces", "frecuencia": 36, "porcentaje": 0.6 }, { "palabra": "algo", "frecuencia": 34, "porcentaje": 0.57 }, { "palabra": "vas", "frecuencia": 33, "porcentaje": 0.55 }, { "palabra": "ahora", "frecuencia": 33, "porcentaje": 0.55 }, { "palabra": "lab", "frecuencia": 30, "porcentaje": 0.5 }, { "palabra": "estás", "frecuencia": 28, "porcentaje": 0.47 }, { "palabra": "igual", "frecuencia": 28, "porcentaje": 0.47 }, { "palabra": "está", "frecuencia": 28, "porcentaje": 0.47 }, { "palabra": "bueno", "frecuencia": 27, "porcentaje": 0.45 }, { "palabra": "oka", "frecuencia": 27, "porcentaje": 0.45 }, { "palabra": "perro", "frecuencia": 27, "porcentaje": 0.45 }, { "palabra": "creo", "frecuencia": 26, "porcentaje": 0.44 }, { "palabra": "bien", "frecuencia": 26, "porcentaje": 0.44 }, { "palabra": "eu", "frecuencia": 26, "porcentaje": 0.44 }] },
    "patrones_linguisticos": { "bigramas": { "total": 20, "top_20": [{ "texto": "system out", "frecuencia": 24 }, { "texto": "out println", "frecuencia": 24 }, { "texto": "haces hoy", "frecuencia": 12 }, { "texto": "qué onda", "frecuencia": 11 }, { "texto": "si queres", "frecuencia": 11 }, { "texto": "onda gordo", "frecuencia": 10 }, { "texto": "hacer algo", "frecuencia": 10 }, { "texto": "puede ser", "frecuencia": 10 }, { "texto": "thread currentthread", "frecuencia": 10 }, { "texto": "currentthread getname", "frecuencia": 10 }, { "texto": "println hilo", "frecuencia": 10 }, { "texto": "for int", "frecuencia": 10 }, { "texto": "che culia", "frecuencia": 8 }, { "texto": "sé si", "frecuencia": 8 }, { "texto": "base datos", "frecuencia": 8 }, { "texto": "ponga presente", "frecuencia": 8 }, { "texto": "void run", "frecuencia": 8 }, { "texto": "println thread", "frecuencia": 8 }, { "texto": "public static", "frecuencia": 8 }, { "texto": "static void", "frecuencia": 8 }] }, "trigramas": { "total": 15, "top_15": [{ "texto": "system out println", "frecuencia": 24 }, { "texto": "thread currentthread getname", "frecuencia": 10 }, { "texto": "out println hilo", "frecuencia": 10 }, { "texto": "out println thread", "frecuencia": 8 }, { "texto": "println thread currentthread", "frecuencia": 8 }, { "texto": "public static void", "frecuencia": 8 }, { "texto": "static void main", "frecuencia": 8 }, { "texto": "void main string", "frecuencia": 8 }, { "texto": "main string args", "frecuencia": 8 }, { "texto": "println hilo getstate", "frecuencia": 8 }, { "texto": "public void run", "frecuencia": 6 }, { "texto": "string args for", "frecuencia": 6 }, { "texto": "args for int", "frecuencia": 6 }, { "texto": "qué onda gordo", "frecuencia": 4 }, { "texto": "vas facu hoy", "frecuencia": 4 }] } }
};

const mockApiCall = (file: File): Promise<AnalysisData> => {
    console.log(`Simulating API call for file: ${file.name}`);
    return new Promise((resolve) => {
        setTimeout(() => {
            // In a real app, you would use FormData and fetch to call the API.
            // For this example, we return the mock data.
            const responseWithFileName = { ...mockApiResponse, metadata: {...mockApiResponse.metadata, archivo: file.name}};
            resolve(responseWithFileName);
        }, 2500); // Simulate network delay
    });
};


const App: React.FC = () => {
    const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = useCallback((selectedFile: File) => {
        setFile(selectedFile);
        setIsLoading(true);
        setError(null);
        mockApiCall(selectedFile)
            .then(data => {
                setAnalysisData(data);
            })
            .catch(err => {
                setError("Failed to analyze the chat file. Please try again.");
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleReset = () => {
        setAnalysisData(null);
        setFile(null);
        setError(null);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-screen">
                    <Spinner />
                    <p className="mt-4 text-xl text-slate-400">Analizando tu chat...</p>
                    <p className="text-slate-500">{file?.name}</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-screen">
                    <p className="text-red-500 text-xl">{error}</p>
                    <button onClick={handleReset} className="mt-4 px-6 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors">
                        Intentar de Nuevo
                    </button>
                </div>
            );
        }

        if (analysisData) {
            return <Dashboard data={analysisData} onReset={handleReset} />;
        }

        return <FileUpload onFileSelect={handleFileSelect} />;
    };

    return (
        <main className="min-h-screen bg-slate-900 p-4 sm:p-6 lg:p-8">
            {renderContent()}
        </main>
    );
};

export default App;
