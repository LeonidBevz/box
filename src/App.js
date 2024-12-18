import './App.css';
import VideoPlayer from './player';

function App() {
  return (
    <div className="App">
      <VideoPlayer/>
      <div className='result'> 
        <button className='scan-butt'>Анализ</button>
        <h1>Результат</h1>
        <div className='rate-container'>
          <p>Оценка модели: </p>
          <p>Время: 3.12 сек. </p>
          <p>Throw с 91.5%</p>
        </div>
        <div className='decidion-container'>
          <p>Решение: </p>
          <p>Модель: True</p>
          <p>Оператор</p>
        </div>
        <div className='result-buttons'>
          <button className='inc'>Inc</button>
          <button className='no-inc'>No inc</button>
        </div>
      </div>
    </div>
  );
}

export default App;
