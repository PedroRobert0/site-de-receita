'use client';

import { useState } from 'react';
import styles from "@/styles/Home.module.css";

export default function Home() {
    const [ingredientes, setIngredientes] = useState('');
    const [restricoes, setRestricoes] = useState('');
    const [receita, setReceita] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleBuscarReceita = async () => {
        setLoading(true);
        setError('');
        setReceita('');
        try {
            const response = await fetch('/api/gerar-receita', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredientes, restricoes }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro desconhecido ao gerar receita na API interna.');
            }

            const data = await response.json();
            setReceita(data.receita);

        } catch (err: any) {
            console.error("Erro ao buscar receita do ChefAI:", err);
            setError(err.message || 'Falha ao conectar com o chef IA. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <div className={styles.header}>
                <h1 className={styles.title}>Bem-vindo ao ChefAI!</h1>
                <p className={styles.paragraph}>Seu site de receitas com inteligência artificial.</p>
            </div>

            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Fale com seu Chef... (ex: frango, arroz, brócolis)"
                    className={styles.searchInput}
                    value={ingredientes}
                    onChange={(e) => setIngredientes(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Restrições (ex: sem glúten, vegano, rápido)"
                    className={styles.searchInput}
                    value={restricoes}
                    onChange={(e) => setRestricoes(e.target.value)}
                />
                <button
                    className={styles.searchButton}
                    onClick={handleBuscarReceita}
                    disabled={loading}
                >
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {receita && (
                <div className={styles.receitaOutput}>
                    <h2>Sua Receita Gerada:</h2>
                    <p style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{receita}</p>
                </div>
            )}
        </main>
    );
}