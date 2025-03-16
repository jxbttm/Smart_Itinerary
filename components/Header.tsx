// components/Header.tsx
import Image from 'next/image'
import AuthForm from '@/components/forms/AuthForm'
import Link from 'next/link'

interface HeaderProps {
  user: any
  onLogout: () => void
}

export const Header = ({ user, onLogout }: { user: any; onLogout: () => void }) => {
    return (
      <div className="navbar bg-base-100 border-b border-gray-300">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" href="/">SmartVoyage</Link>
        </div>
        <div className="flex-none gap-2">
          {/* Conditionally render login button or avatar */}
          {!user ? (
            // If user is not authenticated, show a login button
            <AuthForm />
          ) : (
            // If user is authenticated, show avatar with dropdown options
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {user?.user_metadata?.avatar_url ? (
                    <Image
                    src={user?.user_metadata?.avatar_url}
                    alt="User Avatar"
                    className="w-10 rounded-full"
                    width={10}
                    height={10}
                    quality={100}
                />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      {user ? user.user_metadata?.name[0] : 'U'}
                    </div>
                  )}
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link href={`/profile/${user.id}`}>
                    Profile
                  </Link>
                </li>
                <li>
                  <a onClick={onLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }