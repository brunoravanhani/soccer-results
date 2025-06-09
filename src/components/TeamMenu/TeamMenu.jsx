import './TeamMenu.css';
import TeamMenuItem from '../TeamMenuItem/TeamMenuItem';

export default function TeamMenu() {
    return (
        <div className='team-menu-wrapper'>
            <nav className="TeamMenu">
                <TeamMenuItem imageSrc='/flamengo.png' route="/team/74becc28c493fff8"></TeamMenuItem>
                <TeamMenuItem imageSrc='/cuiaba.png' route="/team/6cd0b6601184f183"></TeamMenuItem>
                <TeamMenuItem imageSrc='/real-madrid.png' route="/team/1a3b4934df24bbf3"></TeamMenuItem>
                <TeamMenuItem imageSrc='/barcelona.png' route="/team/f0dc9b40ff38fa8"></TeamMenuItem>
            </nav>
        </div>
    );
}