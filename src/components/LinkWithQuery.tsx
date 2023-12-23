import { Link, LinkProps, useLocation } from 'react-router-dom'

const LinkWithQuery = ({ children, to, ...props }: LinkProps & React.RefAttributes<HTMLAnchorElement>) => {
  const { search } = useLocation()

  return (
    <Link to={to + search} {...props}>
      {children}
    </Link>
  )
}

export { LinkWithQuery }