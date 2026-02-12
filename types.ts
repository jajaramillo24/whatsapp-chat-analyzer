
export interface AnalysisData {
    metadata: Metadata;
    resumen: Resumen;
    participantes: Participantes;
    mensajes_sistema: MensajesSistema;
    actividad: Actividad;
    analisis_palabras: AnalisisPalabras;
    patrones_linguisticos: PatronesLinguisticos;
}

export interface Metadata {
    archivo: string;
    estado: string;
    fecha_analisis: string;
    version_api: string;
}

export interface Resumen {
    total_mensajes: number;
    mensajes_usuarios: number;
    mensajes_sistema: number;
    participantes: number;
    rango_fechas: RangoFechas;
}

export interface RangoFechas {
    inicio: string;
    fin: string;
}

export interface Participantes {
    lista: string[];
    mensajes_por_participante: { [key: string]: number };
    analisis_detallado: { [key: string]: AnalisisDetalladoParticipante };
}

export interface AnalisisDetalladoParticipante {
    autor: string;
    total_mensajes: number;
    total_palabras: number;
    palabras_unicas: number;
    top_palabras: TopPalabra[];
}

export interface TopPalabra {
    palabra: string;
    frecuencia: number;
}

export interface MensajesSistema {
    total: number;
    por_tipo: { [key: string]: number };
    por_autor: { [key: string]: { [key: string]: number } };
    descripcion: { [key: string]: string };
}

export interface Actividad {
    por_hora: { [key: string]: number };
    hora_mas_activa: number;
    hora_menos_activa: number;
}

export interface AnalisisPalabras {
    total_palabras: number;
    palabras_unicas: number;
    promedio_por_mensaje: number;
    top_30: TopPalabraConPorcentaje[];
}

export interface TopPalabraConPorcentaje {
    palabra: string;
    frecuencia: number;
    porcentaje: number;
}

export interface PatronesLinguisticos {
    bigramas: NgramData;
    trigramas: NgramData;
}

export interface NgramData {
    total: number;
    top_20?: Ngram[];
    top_15?: Ngram[];
}

export interface Ngram {
    texto: string;
    frecuencia: number;
}
