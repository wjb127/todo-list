import React, { useState } from 'react'; // React와 useState 훅을 임포트
import './App.css'; // CSS 파일을 임포트

function App() {
  // useState를 사용하여 tasks와 newTask 상태를 관리 : tasks는 할 일 목록, newTask는 새로운 할 일을 저장
  const [tasks, setTasks] = useState([]); // 할 일 목록을 저장하는 상태 : 초기값은 빈 배열
  const [newTask, setNewTask] = useState(''); // 새로운 할 일을 저장하는 상태 : 초기값은 빈 문자열

  // 할 일 추가 함수 
  const handleAddTask = () => {
    if (newTask.trim() === '') return; // 빈 입력값이면 아무 작업도 하지 않음 : 입력값이 공백 문자로만 이루어져 있으면 함수를 종료
    setTasks([...tasks, { text: newTask, completed: false }]); // 새로운 할 일을 tasks 배열에 추가 : ...tasks에 기존 tasks 배열을 복사하고, { text: newTask, completed: false }를 추가
    setNewTask(''); // 입력 필드를 비움 : newTask 상태를 초기화
  };

  // 할 일 완료/미완료 토글 함수 
  const handleToggleTask = (index) => { // 인덱스를 매개
    const updatedTasks = tasks.map((task, i) => // tasks 배열을 순회하며 새로운 배열을 반환
      i === index ? { ...task, completed: !task.completed } : task 
    ); // 인덱스에 해당하는 할 일의 완료 상태를 반전시킴
    setTasks(updatedTasks); // 상태 업데이트
  };

  // 할 일 삭제 함수
  const handleDeleteTask = (index, event) => {
    event.stopPropagation(); // 이벤트 전파를 막음 : 버튼 클릭 시 li의 onClick 이벤트가 실행되지 않도록 함
    const updatedTasks = tasks.filter((_, i) => i !== index); // 인덱스에 해당하는 할 일을 필터링하여 제거 : i가 인덱스와 같지 않은 경우만 필터링
    setTasks(updatedTasks); // 상태 업데이트
  };

  return (
    <div className="app"> 
      <h1>To-Do List</h1>
      <div className="task-input">
        {/* 할 일 입력 필드 */}
        <input
          type="text"
          value={newTask} // newTask 상태를 입력 필드에 연결
          onChange={(e) => setNewTask(e.target.value)} // 입력값이 변경될 때 newTask 상태 업데이트 : e는 이벤트 객체, e.target.value는 입력 필드의 값, e.target은 이벤트가 발생한 요소
          placeholder="Add a new task..." // 입력 필드에 표시되는 플레이스홀더
        />
        {/* 할 일 추가 버튼 */}
        <button onClick={handleAddTask}>Add Task</button> {/* 버튼을 클릭하면 handleAddTask 함수 호출 */}
      </div>
      <ul className="task-list">
        {/* 할 일 목록 출력 */}
        {tasks.map((task, index) => ( // tasks 배열을 순회하며 할 일 목록을 출력
          <li
            key={index} // 리스트 아이템의 고유 키
            className={task.completed ? 'completed' : ''} // 할 일이 완료되면 'completed' 클래스를 적용
            onClick={() => handleToggleTask(index)} // 할 일을 클릭하면 완료/미완료 상태를 토글
          >
            {task.text} {/* 할 일 텍스트 */}
            {/* 할 일 삭제 버튼 */}
            <button onClick={(event) => handleDeleteTask(index, event)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
