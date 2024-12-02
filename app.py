from flask import Flask, request, jsonify, render_template

app = Flask(_name_)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate-plan', methods=['POST'])
def generate_plan():
    data = request.form
    time_available = int(data['time_available'])  # Tempo disponível (em minutos)
    
    topics = []
    for i in range(1, int(data['num_topics']) + 1):
        topic_name = data[f'topic_{i}']
        priority = data[f'priority_{i}']
        difficulty = data[f'difficulty_{i}']
        topics.append({
            'name': topic_name,
            'priority': priority,
            'difficulty': difficulty
        })
    
    # Calcular o peso de cada tópico com base na prioridade e dificuldade
    total_weight = 0
    for topic in topics:
        weight = 1 if topic['priority'] == 'Alta' else 0.5 if topic['priority'] == 'Média' else 0.25
        weight *= 1 if topic['difficulty'] == 'Fácil' else 1.5 if topic['difficulty'] == 'Médio' else 2
        topic['weight'] = weight
        total_weight += weight
    
    # Alocar o tempo para cada tópico de forma proporcional
    study_plan = []
    total_time = 0
    for topic in topics:
        time_allocation = (topic['weight'] / total_weight) * time_available
        study_plan.append({
            'order': len(study_plan) + 1,
            'topic': topic['name'],
            'time_allocated': round(time_allocation, 2)
        })
        total_time += time_allocation

    # Ajuste para não ultrapassar o tempo total
    time_diff = round(time_available - total_time, 2)
    if time_diff != 0:
        study_plan[0]['time_allocated'] += time_diff

    return render_template('study_plan.html', study_plan=study_plan, total_time=round(total_time, 2))



if _name_ == '_main_':
    app.run(debug=True)