import styles from "@/styles/Home.module.css";

export default function Home() {
        return (

            <main>
                <div className={styles.header}>
                </div>
                    <h1 className={styles.title}>Bem-vindo ao ChefAI</h1>
                    <p className={styles.paragraph}>Seu site de receitas com inteligência artificial.</p>

                <div className={styles.searchBar}>
                    <input
                        type="text" placeholder="Fale com seu Chef..." className={styles.searchInput}/>
                            <button className={styles.searchButton}>Buscar</button>
                </div>
            </main>

            
    );
}
