import './TeamMenu.css';
import TeamMenuItem from '../TeamMenuItem/TeamMenuItem';

export default function TeamMenu() {
    return (
    <nav className="TeamMenu">
        <TeamMenuItem imageSrc='/flamengo.png' route="/team/74becc28c493fff8"></TeamMenuItem>
        <TeamMenuItem imageSrc='/cuiaba.png' route="/team/2"></TeamMenuItem>
        <TeamMenuItem imageSrc='/real-madrid.png' route="/team/3"></TeamMenuItem>
    </nav>);
}