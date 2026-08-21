const links = [
  { href: '#buehne', label: 'Hauptbühne' },
  { href: '#lageplan', label: 'Lageplan' },
  { href: '#staende', label: 'Stände' },
]

export function JumpNav() {
  return (
    <nav className="jump-nav" aria-label="Sprungmarken">
      <ul className="jump-nav__list">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a className="jump-nav__link" href={href}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
