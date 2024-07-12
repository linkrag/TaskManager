import classes from "./App.module.css";
import SocialFollow from "./SocialFollow";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer">
      <footer>
        <div className={classes.branch}>
          <h2>Task Manager</h2>
        </div>
        <div className={classes.lower}>
          <section className={classes.socials}>
            <SocialFollow />
          </section>
          <section>
            <h4>Navegação</h4>
            <ul className={classes.links}>
              <li><Link to="/">Início</Link></li>
              <li><Link to="/criar">Criar pedidos</Link></li>
              <li><Link to="/listar">Listar pedidos</Link></li>
            </ul>
          </section>
        </div>
      </footer>
    </div>
  );
}

export default Footer;