//
export type Jogador = { nome: string, sobrenome: string }

export type Curandeira = Jogador & { apelido: string, onlineEntre: Periodo }

export type Guerreiro = Jogador & { apelido: string } 

export type Periodo = [Horas, Horas]

export interface Horas {
    readonly hora: number
    readonly minuto: number   
}

export type Dungeon = {
    readonly apelidoCurandeira: string 
    readonly apelidoGuerreiro: string 
}

export type Agendamento = { 
    readonly dungeon: Dungeon,
    readonly data: Date,
    readonly periodo: Periodo
}
