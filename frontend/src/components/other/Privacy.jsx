import { useDispatch } from 'react-redux';
import { setNavbarDisplay } from '../../actions/layoutActions'


function Privacy() {
	const dispatch = useDispatch()
	dispatch(setNavbarDisplay(false))

	return (
		<>
			<h1>Polityka prywatności</h1>
			<p>
				W Katemath priorytetem jest ochrona Twojej prywatności. 
				Z tego względu starannie podchodzimy do kwestii zbierania danych, 
				które mogą być powiązane z Twoją osobą (tzw. danych osobowych).
			</p>
			<h2>Jakie dane gromadzimy?</h2>
			<p>
				Podczas rejestracji konta użytkownika prosimy o podanie adresu e-mail. 
				Nie zbieramy numerów PESEL ani żadnych wrażliwych danych osobowych.
				Kiedy zakładasz konto, możesz realizować płatności przez nasz interfejs użytkownika 
				za pomocą przelewu, płatności BLIK, lub podając dane swojej karty płatniczej naszemu dostawcy 
				usług płatniczych, Paynow (mBank S.A.). Dane te są przetwarzane przez Paynow,
				który odpowiada za nie przed Tobą jako użytkownikiem.
			</p>
			<h2>Kto jest administratorem Twoich danych osobowych?</h2>
			<p>Administratorem danych osobowych w serwisie katemath.pl jest firma Katemath.</p>
			<h2>Jak się z nami skontaktować, aby uzyskać więcej informacji o przetwarzaniu Twoich danych osobowych?</h2>
			<p>Jeśli potrzebujesz więcej informacji, skontaktuj się z nami pod adresem e-mail: c.szukiel@gmail.com.</p>
			<h2>Jakie Twoje dane osobowe przetwarza Katemath?</h2>
			<p> Po zarejestrowaniu się w serwisie katemath.pl, przechowujemy w zabezpieczonej bazie danych następujące dane osobowe: </p>
				<ul>
					<li>Twój adres e-mail, login oraz hasło podane podczas rejestracji.</li>
					<li>Informacje o dokonanych płatnościach, takie jak data, godzina oraz kwota transakcji.</li>
					<li>Informacje o dacie rejestracji konta oraz ostatnim logowaniu.</li>
					<li>Informacje o ustawieniach konta.</li>
					<li>Informacje o Twoich postępach w nauce.</li>
				</ul>
			<p>
				Ponadto firma Katemath ma dostęp do danych podanych przez Ciebie w korespondencji e-mailowej 
				na adres c.szukiel@gmail.com. Wszystkie te dane są przechowywane wyłącznie na wspomnianych kontach e-mailowych. 
				Jeśli poprosisz o wystawienie faktury, dane podane przez Ciebie będą przechowywane w dokumentacji księgowej. 
				Dane z płatności (np. imię i nazwisko, numer konta bankowego, adres) są przetwarzane przez Paynow (https://paynow.com). 
				Katemath nie ma dostępu do tych danych.
			</p>
			<h2>Jakie dane są zapisywane w ciasteczkach (cookies)?</h2>
			<p>
				Podczas korzystania z serwisu katemath.pl na Twoim urządzeniu mogą być zapisywane ciasteczka (cookies). 
				Używamy ich do utrzymania Twojej sesji, poprawy wyświetlania serwisu, obsługi statystyk Google Analytics 
				oraz reklam Google Adsense. Dodatkowo, ciasteczka mogą zawierać informacje o ustawieniach konta 
				oraz Twój login. Adres e-mail nie jest przechowywany w ciasteczkach.
			</p>
			<h2>Jak Katemath przetwarza Twoje dane osobowe?</h2>
			<p> Przetwarzamy Twoje dane osobowe w następujący sposób: </p>
				<ul>
					<li>Zbieramy dane podane przez Ciebie podczas rejestracji.</li>
					<li>Zbieramy dane dotyczące Twojej aktywności na koncie: data rejestracji, ostatnie logowanie oraz historia transakcji.</li>
					<li>Przechowujemy te dane w zabezpieczonej bazie danych.</li>
					<li>Usuwamy Twoje dane osobowe na Twoje życzenie lub gdy konto jest nieaktywne przez dłuższy czas.</li>
					<li>Wyszukujemy informacje dotyczące Twojego konta oraz historii transakcji, aby lepiej obsługiwać Twoje konto i udzielać wsparcia, gdy tego potrzebujesz.</li>
				</ul>
			<h2>Dlaczego Katemath przechowuje Twoje dane osobowe?</h2>
			<p> Przechowujemy Twoje dane, aby: </p>
				<ul>
					<li>umożliwić Ci logowanie do serwisu katemath.pl oraz aplikacji Katemath,</li>
					<li>umożliwić Ci dokonywanie płatności w serwisie katemath.pl oraz aplikacji Katemath,</li>
					<li>umożliwić Ci korzystanie z aplikacji Katemath,</li>
					<li>zapewnić Ci pomoc w przypadku zapomnienia hasła lub innych problemów z serwisem katemath.pl lub aplikacją Katemath.</li>
				</ul>
			<h2>Czy musisz podawać swoje dane osobowe?</h2>
			<p>
				Wymagamy podania jedynie adresu e-mail, aby umożliwić rejestrację konta, logowanie i dokonywanie płatności. 
				Podanie innych danych osobowych (imienia i nazwiska, adresu) nie jest konieczne. 
				Jeśli chcesz otrzymać fakturę za zakup, prześlij dane do faktury na adres e-mail c.szukiel@gmail.com.
			</p>
			<h2>Jak długo przechowujemy Twoje dane osobowe?</h2>
			<p>
				Twoje dane będą przechowywane w serwisie katemath.pl dopóki będzie istniało Twoje konto. 
				Po usunięciu konta, wszystkie dane zostaną natychmiast usunięte. 
				Jeżeli konto będzie nieaktywne przez 2 lata, zostanie automatycznie skasowane wraz z wszystkimi danymi.
			</p>
			<h2>Jakie masz prawa w zakresie przetwarzanych danych?</h2>
			<p> Gwarantujemy wszystkie Twoje prawa wynikające z Ogólnego Rozporządzenia o Ochronie Danych Osobowych (RODO). W szczególności: </p>
				<ul>
					<li>Prawo do zmiany danych podanych podczas rejestracji.</li>
					<li>Prawo do usunięcia wszystkich danych z serwisu katemath.pl oraz aplikacji Katemath.</li>
					<li>Prawo dostępu do wszystkich swoich danych osobowych.</li>
					<li>Prawo do ograniczenia przetwarzania danych.</li>
					<li>Prawo do przenoszenia danych.</li>
					<li>Prawo do wniesienia sprzeciwu wobec przetwarzania danych.</li>
					<li>Prawo do wniesienia skargi do organu nadzorczego.</li>
				</ul>
			<h2>Komu udostępniamy Twoje dane osobowe?</h2>
			<p>
				Twoje dane osobowe nie są udostępniane stronom trzecim. 
				Możemy przekazać dane osobowe organom publicznym walczącym z oszustwami i nadużyciami.
			</p>
			<h2>Czy możesz wycofać zgodę na przetwarzanie danych osobowych przez Katemath?</h2>
			<p>
				Tak, w dowolnym momencie możesz wycofać zgodę na przetwarzanie danych i usunąć wszystkie swoje dane osobowe 
				z serwisu katemath.pl oraz aplikacji Katemath. Aby to zrobić, napisz na adres c.szukiel@gmail.com.
			</p>
			<h2>Czy możesz usunąć wszystkie swoje dane z serwisu katemath.pl oraz aplikacji Katemath?</h2>
			<p>Tak, w każdej chwili możesz usunąć swoje konto wraz ze wszystkimi danymi. W tym celu napisz na adres c.szukiel@gmail.com.</p>
			<h2>Jak zostaniesz poinformowany o zmianach w polityce prywatności?</h2>
			<p>
				Polityka prywatności może być aktualizowana w celu dostosowania do zmian w przepisach prawa 
				lub zmian w oferowanych usługach. Zmiany wejdą w życie w terminie podanym w informacji o ich wprowadzeniu. 
				Polityka będzie wiązać użytkownika, o ile nie zrezygnuje z usługi, informując nas o tym na adres c.szukiel@gmail.com, 
				w przypadku braku akceptacji nowej treści polityki.
			</p>
		</>
		)
}

export default Privacy