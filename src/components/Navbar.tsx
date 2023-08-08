import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar bg-primary text-white">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Task APP</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a>Kanban</a>
                    </li>
                    <li>
                        <a>Nested</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
