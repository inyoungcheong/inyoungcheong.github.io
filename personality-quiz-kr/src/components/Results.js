// src/components/Results.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// 그리스 로마 신화 캐릭터 데이터
const mythCharacters = {
  "HHHHH": {
    name: "아폴로",
    emoji: "☀️",
    characteristics: "다재다능하고 활발한 성격으로, 예술적 감각과 리더십을 동시에 갖춘 유형입니다. 타인과의 관계를 중시하며, 체계적이고 창의적인 방식으로 일을 처리합니다. 감정이 풍부하고 예술적 영감을 잘 받는 것이 특징입니다.",
    strengths: "뛰어난 창의성과 예술성, 탁월한 의사소통 능력, 다양한 분야에 대한 재능, 영감을 주는 리더십",
    weaknesses: "완벽주의적 성향, 감정 기복, 에너지 분산, 우선순위 설정의 어려움",
    tips: `매일 아침 영감 노트를 작성하며 하루를 시작하세요. 영감이 떠오를 때마다 즉시 기록하는 습관을 들이세요. 매주 한 가지 새로운 도전 과제를 설정하고 달성하세요. 창의적 활동과 실무적 업무 사이에 명확한 경계를 설정하여 집중도를 높이세요.`
},

"HHHHL": {
    name: "디오니소스",
    emoji: "🍷",
    characteristics: "열정적이고 사교적이며, 삶의 즐거움을 추구하는 유형입니다. 새로운 경험을 즐기며, 타인에게 영감을 주고 활력을 불어넣는 능력이 있습니다. 직관적인 통찰력과 공감 능력이 뛰어납니다.",
    strengths: "뛰어난 사교성, 강한 직관력, 창의적 문제해결 능력, 타인을 동기부여하는 재능",
    weaknesses: "즉흥적 의사결정, 체계성 부족, 감정적 변동성, 일관성 유지의 어려움",
    tips: `하루를 시작할 때 가장 중요한 세 가지 목표를 정하세요. 소규모 모임에서 시작해서 점차 네트워크를 확장해가세요. 매주 한 번은 새로운 사람들과의 만남을 계획하세요. 창의적 아이디어를 실현할 수 있는 프로젝트에 참여하세요.`
},

"HHHLH": {
    name: "헤라클레스",
    emoji: "🦁",
    characteristics: "강한 책임감과 리더십을 가진 행동가형 인물입니다. 목표 지향적이며 도전을 즐기고, 타인을 돕는 것에서 큰 보람을 느낍니다. 창의적인 문제 해결 능력과 실행력을 겸비했습니다.",
    strengths: "뛰어난 실행력, 강한 책임감, 목표 지향적 태도, 타인을 돕는 리더십",
    weaknesses: "과도한 완벽주의, 일과 삶의 균형 부족, 자기 관리 소홀, 지나친 자기 희생",
    tips: `매일 아침 운동으로 하루를 시작하세요. 주간 목표를 설정하고 진행 상황을 매일 체크하세요. 한 달에 한 번은 새로운 도전 과제를 시작하세요. 멘토링이나 봉사 활동을 통해 리더십을 발휘하세요.`
},

  "HHHLL": {
    name: "헤베",
    emoji: "🌸",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },
  "HHLHH": {
    name: "이리스",
    emoji: "🌈",
    characteristics: "메시지를 전달하고 소통을 촉진하는 능력이 뛰어난 유형입니다.",
    strengths: [
      "뛰어난 의사소통 능력",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "HHLHL": {
    name: "판",
    emoji: "🎵",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "HHLLH": {
    name: "헤르메스",
    emoji: "⚡",
    characteristics: "활발하고 친근한 성격으로, 자유로운 영혼을 가진 유형입니다. 감정적으로 안정되어 있으며, 창의적인 문제 해결 능력이 뛰어납니다. 변화를 즐기고 새로운 아이디어를 실험하는 것을 좋아합니다.",
    strengths: [
      "뛰어난 적응력과 유연성",
      "창의적인 문제 해결 능력",
      "탁월한 의사소통 능력",
      "빠른 학습력"
    ],
    weaknesses: [
      "집중력 부족",
      "일관성 유지의 어려움",
      "깊이 있는 탐구 부족",
      "약속 준수의 어려움"
    ],
    tips: `자유로운 업무 환경을 최대한 활용하세요. 재택근무나 유연근무제가 가능하다면 적극적으로 활용하는 것이 좋습니다...` // 기존 긴 내용 유지
  },

  "HHLLL": {
    name: "에로스",
    emoji: "💝",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },
  "HLHHH": {
    name: "미네르바",
    emoji: "🦉",
    characteristics: "활기찬 에너지와 독립적인 사고방식을 가졌으며, 체계적이고 전략적인 문제 해결을 선호합니다. 감정에 민감하면서도 창의적인 접근을 하는 전략가형 인물입니다. 지적 호기심이 강하고 새로운 아이디어를 실현시키는 능력이 뛰어납니다.",
    strengths: [
      "뛰어난 분석력과 통찰력",
      "창의적인 문제 해결 능력",
      "전략적 사고력",
      "높은 학습 능력과 적응력"
    ],
    weaknesses: [
      "과도한 완벽주의 성향",
      "때로는 지나치게 비판적",
      "감정적 스트레스에 취약",
      "타인의 감정을 간과할 수 있음"
    ],
    tips: `아침에 일어나면 하루의 목표와 우선순위를 정하는 시간을 가지세요...` // 기존 긴 내용 유지
  },

  "HLHHL": {
    name: "포세이돈",
    emoji: "🌊",
    characteristics: "분석 중...",
    strengths: [
      "강력한 리더십",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "HLHLH": {
    name: "제우스",
    emoji: "⚡",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "HLHLL": {
    name: "아킬레우스",
    emoji: "⚔️",
    characteristics: "활동적이고 독립적인 성향으로, 체계적인 목표 달성을 중시합니다. 감정적으로 안정되어 있으며 현실적인 판단력이 뛰어납니다. 명확한 목표를 향해 전진하는 것을 좋아하며, 실행력이 강점인 유형입니다.",
    strengths: [
      "강력한 실행력과 추진력",
      "명확한 목표 의식",
      "뛰어난 위기 대처 능력",
      "현실적인 문제 해결 능력"
    ],
    weaknesses: [
      "지나친 자신감",
      "타협점 찾기 어려움",
      "때로는 경직된 사고방식",
      "피드백 수용에 어려움"
    ],
    tips: `매일 아침 '오늘의 승리'를 정하고 시작하세요...` // 기존 긴 내용 유지
  },
  "HLLHH": {
    name: "프로메테우스",
    emoji: "🔥",
    characteristics: "분석 중...",
    strengths: [
      "혁신적인 사고력",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "HLLHL": {
    name: "페르세우스",
    emoji: "🗡️",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "HLLLH": {
    name: "이카루스",
    emoji: "🕊️",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "HLLLL": {
    name: "오디세우스",
    emoji: "🚢",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },
  "LHHHH": {
    name: "헤파이스토스",
    emoji: "🔨",
    characteristics: "차분하지만 친근한 성격으로, 체계적이고 섬세한 작업을 선호합니다. 감정이 풍부하고 창의적인 문제 해결 능력이 뛰어납니다. 기술과 예술을 결합하는 능력이 특별한 유형입니다.",
    strengths: [
      "뛰어난 기술적 창의성",
      "섬세한 작업 능력",
      "높은 문제 해결력",
      "끈기 있는 과제 수행"
    ],
    weaknesses: [
      "사회적 상황에서의 불편함",
      "과도한 완벽주의",
      "자신감 부족",
      "스트레스에 민감"
    ],
    tips: `자신만의 작업 공간을 최적화하세요...` // 기존 긴 내용 유지
  },

  "LHHHL": {
    name: "데메테르",
    emoji: "🌾",
    characteristics: "차분하고 배려심 깊으며, 체계적인 돌봄을 제공하는 유형입니다. 감정이 풍부하고 현실적인 문제 해결을 선호합니다.",
    strengths: [
      "뛰어난 돌봄 능력",
      "체계적인 업무 처리",
      "강한 책임감",
      "실용적 문제해결력"
    ],
    weaknesses: [
      "과도한 책임감",
      "자기희생적 성향",
      "변화 수용의 어려움",
      "일과 삶의 균형 부족"
    ],
    tips: `자기 돌봄 시간을 반드시 확보하세요...` // 기존 긴 내용 유지
  },

  "LHHLH": {
    name: "아스클레피오스",
    emoji: "⚕️",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "LHHLL": {
    name: "헤스티아",
    emoji: "🏛️",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },
  "LHLHH": {
    name: "오르페우스",
    emoji: "🎭",
    characteristics: "조용하고 독립적이며, 예술적 감성이 풍부한 유형입니다. 깊은 감정과 창의성을 지니고 있습니다.",
    strengths: [
      "깊은 예술적 통찰력",
      "독창적 사고방식",
      "감정의 섬세한 표현력",
      "집중력과 몰입도"
    ],
    weaknesses: [
      "현실과의 괴리",
      "의사소통의 어려움",
      "고독 추구",
      "실용성 부족"
    ],
    tips: `예술적 활동과 실용적 업무의 균형을 찾으세요...` // 기존 긴 내용 유지
  },

  "LHLHL": {
    name: "에코",
    emoji: "🌿",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "LHLLH": {
    name: "키론",
    emoji: "🎯",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "LHLLL": {
    name: "프시케",
    emoji: "🦋",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  }, "LLHHH": {
    name: "카산드라",
    emoji: "🔮",
    characteristics: "차분하고 독립적이며, 뛰어난 통찰력과 예지력을 가진 유형입니다. 체계적인 분석과 창의적 해석 능력이 특징입니다.",
    strengths: [
      "예리한 통찰력",
      "분석적 사고능력",
      "미래 예측 능력",
      "독창적 문제해결력"
    ],
    weaknesses: [
      "의견 전달의 어려움",
      "고립감",
      "불안감",
      "타인의 불신에 대한 좌절"
    ],
    tips: `당신의 통찰을 객관적 데이터와 함께 제시하세요...` // 기존 긴 내용 유지
  },

  "LLHHL": {
    name: "테미스",
    emoji: "⚖️",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "LLHLH": {
    name: "우라니아",
    emoji: "🌌",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "LLHLL": {
    name: "헤카테",
    emoji: "🌙",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "LLLHH": {
    name: "칼리오페",
    emoji: "📚",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "LLLHL": {
    name: "넵튠",
    emoji: "🌊",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "LLLLH": {
    name: "크로노스",
    emoji: "⏳",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  },

  "LLLLL": {
    name: "하데스",
    emoji: "🌑",
    characteristics: "분석 중...",
    strengths: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    weaknesses: [
      "분석 중...",
      "분석 중...",
      "분석 중...",
      "분석 중..."
    ],
    tips: "분석 중..."
  }
};


const Results = ({ results, onRestart }) => {
  // 결과가 없을 때의 처리
  if (!results || !Array.isArray(results)) {
    return (
      <div className="quiz-card">
        <div className="quiz-header">
          <h2>결과를 분석중입니다...</h2>
        </div>
      </div>
    );
  }

  // 성격 유형 코드 생성
  const getPersonalityCode = (results) => {
    return results.map(r => r.score > 3 ? "H" : "L").join("");
  };

  const personalityCode = getPersonalityCode(results);
  
  // 해당하는 유형이 없을 경우의 기본값
  const defaultType = {
    name: "알 수 없는 유형",
    emoji: "❓",
    characteristics: "분석 중...",
    strengths: [],
    weaknesses: [],
    tips: "더 자세한 분석이 필요합니다."
  };

  const personalityType = mythCharacters[personalityCode] || defaultType;

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <h2>그리스로마신화 속 당신은?</h2>
        <h3 className="personality-type">
          {personalityType.name} {personalityType.emoji}
        </h3>
      </div>
      
      <div className="quiz-content">
        <div className="chart-container">
          <BarChart width={600} height={250} data={results}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="domain" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Bar dataKey="score" fill="#4f46e5" />
          </BarChart>
        </div>
        
        <div className="results-container">
          {results.map((result, index) => (
            <div key={index} className="result-item">
              <div className="result-header">
                <h3>{result.domain}</h3>
                <span>{result.score}/5</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${result.score * 20}%` }} 
                />
              </div>
              <p>{result.description}</p>
            </div>
          ))}
        </div>

        {personalityType !== defaultType && (
          <div className="personality-details">
            <section className="characteristics">
              <h4>특성</h4>
              <p>{personalityType.characteristics}</p>
            </section>

            <section className="strengths-weaknesses">
              <h4>강점과 약점</h4>
              <div className="strengths">
                <h5>강점:</h5>
                <ul>
                  {personalityType.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div className="weaknesses">
                <h5>약점:</h5>
                <ul>
                  {personalityType.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="real-world-tips">
              <h4>현실세계에서의 팁</h4>
              <p style={{ whiteSpace: 'pre-line' }}>{personalityType.tips}</p>
            </section>
          </div>
        )}

        <button 
          onClick={onRestart}
          className="quiz-button"
        >
          다시 시작하기
        </button>
      </div>
    </div>
  );
};

export default Results;