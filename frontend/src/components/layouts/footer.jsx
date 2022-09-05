export default function Footer() {
  return (
    <footer className="">
      <div className="container footer p-8">
        <div>
          <span className="footer-title">RELEARN</span>
          <p>ReLearn is a website to study and review materials</p>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </div>
    </footer>
  );
}
