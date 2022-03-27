import { UserCircleIcon } from '@heroicons/react/solid';
import { Menu } from '@headlessui/react';
import AuthService from '../../services/Auth.service';
import { FC } from 'react';

const UserMenu: FC = ({}) => {
    return(
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>
                <UserCircleIcon className="h-8 w-8 rounded-full bg-transparent text-main-1"/>
            </Menu.Button>
            <Menu.Items className="z-10 absolute right-0 shadow rounded bg-white py-2 px-4">
                <Menu.Item as="button" onClick={AuthService.logout}>
                    Logout
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
}

export default UserMenu;