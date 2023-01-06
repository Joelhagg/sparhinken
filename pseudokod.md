# Pseudokod

## Funktioner

- Skapa användare
- Logga in
- Ändra lösenord
- Uppdatera användarinställningar
- Skapa en ny hink
- Uppdatera existerande hink
- Radera hink
- Återskapa raderad hink
- Uppdatera ekonomiska inställningar

### <strong>Bonusfunktioner</strong>

<em>Lägg till om det finns tid</em>

- Lägga till månadssparande
- Graf för månadssparande
- Verktyg för att räkna ut sin månadsutgifter
- lägg till kommentarer vid händelser
- animation vid laddning eller hink

<br>

# Routes

- Home <br>
- Nav <br>
- Login <br>
- Create user <br>
- Dashboard <br>
- Bucket <br>
- Settings <br>
- 404 <br>

<br>

Använd React-Router-Dom <br>
[Learn React Router v6 In 45 Minutes](https://www.youtube.com/watch?v=Ul3y1LXxzdU&ab_channel=WebDevSimplified)

<br>

# Hantera data

- ## Skicka data <br>
- ## Hämta data <br>

Datan som ska skickas/hämtas kommer att vara ett object med den datan som finns tillgänglig, <br>
tex hinkens: <br>

- name
- size
- riskLevel - etc...

När en ny användare skapas och inställningarna är ifyllda så skickas datan till FireStore, <br>
det som sparas på den skapade användaren är id och dom nummervärden av inställningarna som sparas. <br>
När en hink sparas så uppdateras den existerande användarinfon med en ny hink. <br>
