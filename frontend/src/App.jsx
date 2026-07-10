import { Link, redirect } from "react-router";

import Button from "./components/UI/Button.jsx";
import MovieLists from "./components/pages/MovieLists.jsx";
import Reason from "./components/UI/Reason.jsx";
import QNAs from "./components/UI/QNAs.jsx";
import EmailMainInput from "./components/UI/EmailMainInput.jsx";
import SelectLanguage from "./components/UI/SelectLanguage.jsx";
import { getFetchedMovies } from "./util/https.js";
import { reason } from "./util/dummy.js";

import Netflix from "./assets/netflix.png";
import "./styles/css/classes/pages/app.css";

const App = () => {
  return (
    <div className="landing">
      <section className="landing__hero">
        <nav className="hero__nav">
          <div className="nav__left">
            <Link to="/">
              <img src={Netflix} alt="Netflix" />
            </Link>
          </div>
          <div className="nav__right">
            <SelectLanguage />
            <Link to="/login">
              <Button type={"button"} styles={"main-btn"}>
                Masuk
              </Button>
            </Link>
          </div>
        </nav>

        <section className="hero__main">
          <div className="main__header">
            <h1>Film dan serial TV tanpa batas, dan lebih banyak lagi</h1>
            <h2>Harga mulai dari Rp54.000. Batalkan kapan pun.</h2>
          </div>
          <EmailMainInput />
        </section>
      </section>

      <section className="landing__movies">
        <h2>Sedang Tren Sekarang</h2>
        <MovieLists
          movies={
            getFetchedMovies("/3/movie/popular?language=en-US&page=1").movies
          }
        />
      </section>

      <section className="landing__reason">
        <h2>Alasan Lainnya untuk Bergabung</h2>
        <div className="reason__wrapper">
          {reason &&
            reason.map((r) => {
              return <Reason why={r.why} more={r.more} key={r.id} />;
            })}
        </div>
      </section>

      <section className="landing__qna">
        <h2>Tanya Jawab Umum</h2>
        <QNAs />
      </section>

      <section className="landing__footer">
        <div className="footer__input">
          <EmailMainInput />
        </div>
        <div className="footer">
          <div className="footer__contact">
            <span>Ada pertanyaan? Hubungi </span>
            <span className="contact">007-803-321-8275</span>
          </div>
          <ul className="footer__lists">
            <li className="footer__list">Tanya Jawab</li>
            <li className="footer__list">Pusat Bantuan</li>
            <li className="footer__list">Akun</li>
            <li className="footer__list">Pusat Media</li>
            <li className="footer__list">Hubungan Investor</li>
            <li className="footer__list">Lowongan Kerja</li>
            <li className="footer__list">Tukar Kartu Hadiah</li>
            <li className="footer__list">Beli kartu Hadiah</li>
            <li className="footer__list">Cara Menonton</li>
            <li className="footer__list">Ketentuan Penggunaan</li>
            <li className="footer__list">Privasi</li>
            <li className="footer__list">Preferensi Cookie</li>
            <li className="footer__list">Informasi Perusahaan</li>
            <li className="footer__list">Hubungi Kami</li>
            <li className="footer__list">Uji Kecepatan</li>
            <li className="footer__list">Informasi Legal</li>
            <li className="footer__list">Hanya di Netflix</li>
          </ul>
          <SelectLanguage />
          <p className="footer__brand--text">Netflix Indonesia</p>
          <div className="footer__cr">
            <span>
              Halaman ini dilindungi oleh reCAPTCHA Google untuk memastikan kamu
              bukan bot.
            </span>
            <span className="cr">Pelajari selengkapnya.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;

export const isAuthLoader = async () => {
  const response = await fetch("http://localhost:3000/isAuth", {
    credentials: "include",
  });

  if (response.ok) {
    throw redirect("/home");
  }
};
