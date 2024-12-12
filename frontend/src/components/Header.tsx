const Header: React.FC<{ title: string }> = ({ title }) => (
    <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    </div>
);

export default Header;