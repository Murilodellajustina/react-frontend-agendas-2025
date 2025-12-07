export default function Footer() {
  return (
    <footer className="bg-light text-dark py-3 mt-5">
      <div className="container text-center">
        <p className="mb-0">© {new Date().getFullYear()} - AgendaFácil</p>
      </div>
    </footer>
  );
}
