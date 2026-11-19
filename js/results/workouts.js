// Populate Tab 2: Dynamic Tailored Workouts
function generateCombatWorkouts() {
  const container = document.getElementById('workout-schedule-container');
  container.innerHTML = "";

  const badge = document.getElementById('workout-strategy-badge');
  const repRange = document.getElementById('workout-rep-range');
  const desc = document.getElementById('workout-strategy-desc');

  if (AppState.goal === 'BULK') {
    badge.textContent = "CADENCE: MASS OVERLOAD (+350 KCAL)";
    repRange.textContent = "6-10 REPS // 2.5m REST // RPE 8-9";
    desc.textContent = "Maximum mechanical tension and axial drive. Heavy progressive overload tuned for tissue expansion.";
  } else if (AppState.goal === 'CUT') {
    badge.textContent = "CADENCE: LEAN RETENTION (-450 KCAL)";
    repRange.textContent = "8-12 REPS // 90s REST // RPE 8";
    desc.textContent = "Metabolic density and volume retention. Preserves lean skeletal mass while burning adipose fuel.";
  } else {
    badge.textContent = "CADENCE: RECOMPOSITION EQUILIBRIUM";
    repRange.textContent = "6-12 HYBRID // 2m REST // RPE 8";
    desc.textContent = "Balanced strength-hypertrophy equilibrium. Enhances neuromuscular power and mitochondrial density.";
  }

  // Safe movement selectors based on joint restrictions
  const safeSquat = AppState.restrictions.has('lower_back') ? 'Belt Squats / Hack Squats' : (AppState.restrictions.has('knees') ? 'Spanish Box Squats' : 'Barbell Back Squats');
  const safePress = AppState.restrictions.has('shoulders') ? 'Neutral Landmine Press' : 'Incline Barbell Press';
  const safeRow = AppState.restrictions.has('lower_back') ? 'Chest-Supported T-Bar Rows' : 'Barbell Bent-Over Rows';
  const safeArm = AppState.restrictions.has('wrists') ? 'EZ-Bar Spider Curls' : 'Incline Dumbbell Bicep Curls';

  const daysCount = AppState.weeklyDays;
  const targets = Array.from(AppState.selectedMuscles);

  let routineDays = [];

  if (daysCount === 3) {
    routineDays = [
      {
        name: "DAY 01 // FULL-BODY COMBAT ALPHA",
        type: "ANTERIOR / PUSH FOCUS",
        exercises: [
          { name: safePress, sets: targets.includes('CHEST') ? "4 sets x 8 reps" : "3 sets x 8 reps", isFocus: targets.includes('CHEST') },
          { name: safeSquat, sets: targets.includes('QUADS') ? "4 sets x 8-10 reps" : "3 sets x 8-10 reps", isFocus: targets.includes('QUADS') },
          { name: "Cable Lateral Raises", sets: targets.includes('DELTS') ? "4 sets x 12 reps" : "3 sets x 12 reps", isFocus: targets.includes('DELTS') },
          { name: "Hanging Leg Raises", sets: targets.includes('CORE') ? "4 sets x 15 reps" : "3 sets x 12 reps", isFocus: targets.includes('CORE') }
        ]
      },
      {
        name: "DAY 02 // FULL-BODY COMBAT BETA",
        type: "POSTERIOR / PULL FOCUS",
        exercises: [
          { name: safeRow, sets: targets.includes('LATS') ? "4 sets x 8 reps" : "3 sets x 8 reps", isFocus: targets.includes('LATS') },
          { name: "Romanian Deadlifts (Glute Drive)", sets: "3 sets x 8-10 reps", isFocus: false },
          { name: safeArm, sets: targets.includes('ARMS') ? "4 sets x 10 reps" : "3 sets x 10 reps", isFocus: targets.includes('ARMS') },
          { name: "Rear Delt Facepulls", sets: targets.includes('DELTS') ? "4 sets x 15 reps" : "3 sets x 12 reps", isFocus: targets.includes('DELTS') }
        ]
      },
      {
        name: "DAY 03 // FULL-BODY TITAN OVERLOAD",
        type: "COMPOUND POWER HYBRID",
        exercises: [
          { name: "Dumbbell Flat Press", sets: targets.includes('CHEST') ? "4 sets x 8 reps" : "3 sets x 8 reps", isFocus: targets.includes('CHEST') },
          { name: "Lat Pulldowns (Neutral Grip)", sets: targets.includes('LATS') ? "4 sets x 10 reps" : "3 sets x 10 reps", isFocus: targets.includes('LATS') },
          { name: "Bulgarian Split Squats", sets: targets.includes('QUADS') ? "4 sets x 10/leg" : "3 sets x 10/leg", isFocus: targets.includes('QUADS') },
          { name: "Overhead Rope Tricep Extensions", sets: targets.includes('ARMS') ? "4 sets x 12 reps" : "3 sets x 12 reps", isFocus: targets.includes('ARMS') }
        ]
      }
    ];
  } else if (daysCount === 4) {
    routineDays = [
      {
        name: "DAY 01 // UPPER TORSO PROTOCOL",
        type: "CHEST, DELTS & LATS POWER",
        exercises: [
          { name: safePress, sets: targets.includes('CHEST') ? "4 sets x 6-8 reps" : "3 sets x 8 reps", isFocus: targets.includes('CHEST') },
          { name: safeRow, sets: targets.includes('LATS') ? "4 sets x 8-10 reps" : "3 sets x 8 reps", isFocus: targets.includes('LATS') },
          { name: "Dumbbell Lateral Raises", sets: targets.includes('DELTS') ? "4 sets x 12 reps" : "3 sets x 12 reps", isFocus: targets.includes('DELTS') },
          { name: "Tricep Overhead Extensions", sets: targets.includes('ARMS') ? "4 sets x 10 reps" : "3 sets x 10 reps", isFocus: targets.includes('ARMS') }
        ]
      },
      {
        name: "DAY 02 // LOWER KINETIC CHAIN",
        type: "QUAD, POSTERIOR & CORE",
        exercises: [
          { name: safeSquat, sets: targets.includes('QUADS') ? "4 sets x 8 reps" : "3 sets x 8 reps", isFocus: targets.includes('QUADS') },
          { name: "Seated Hamstring Leg Curls", sets: "3 sets x 10-12 reps", isFocus: false },
          { name: "Walking Lunges (Dumbbells)", sets: targets.includes('QUADS') ? "3 sets x 12 steps" : "2 sets x 12 steps", isFocus: targets.includes('QUADS') },
          { name: "Cable Woodchoppers", sets: targets.includes('CORE') ? "4 sets x 15 reps" : "3 sets x 12 reps", isFocus: targets.includes('CORE') }
        ]
      },
      {
        name: "DAY 03 // UPPER HYPERTROPHY NODE",
        type: "VOLUME TARGET EXPANSION",
        exercises: [
          { name: "Incline Dumbbell Flyes", sets: targets.includes('CHEST') ? "4 sets x 10-12 reps" : "3 sets x 10 reps", isFocus: targets.includes('CHEST') },
          { name: "Neutral Grip Cable Pulldowns", sets: targets.includes('LATS') ? "4 sets x 10 reps" : "3 sets x 10 reps", isFocus: targets.includes('LATS') },
          { name: safeArm, sets: targets.includes('ARMS') ? "4 sets x 10 reps" : "3 sets x 10 reps", isFocus: targets.includes('ARMS') },
          { name: "Cable Y-Raises (Rear/Side Delts)", sets: targets.includes('DELTS') ? "4 sets x 15 reps" : "3 sets x 12 reps", isFocus: targets.includes('DELTS') }
        ]
      },
      {
        name: "DAY 04 // LOWER & CORE OVERLOAD",
        type: "HYPERTROPHY & FOUNDATION",
        exercises: [
          { name: "Leg Press (High Foot Position)", sets: targets.includes('QUADS') ? "4 sets x 10-12 reps" : "3 sets x 10 reps", isFocus: targets.includes('QUADS') },
          { name: "Romanian Dumbbell Deadlifts", sets: "3 sets x 8-10 reps", isFocus: false },
          { name: "Standing Calf Machine", sets: "4 sets x 15 reps", isFocus: false },
          { name: "Hanging Knee-to-Elbows", sets: targets.includes('CORE') ? "4 sets x 12 reps" : "3 sets x 10 reps", isFocus: targets.includes('CORE') }
        ]
      }
    ];
  } else {
    routineDays = [
      {
        name: "DAY 01 // PUSH OVERLOAD",
        type: "CHEST, ANTERIOR DELTS, TRICEPS",
        exercises: [
          { name: safePress, sets: "4 sets x 8 reps", isFocus: targets.includes('CHEST') },
          { name: "Cable Cross-Overs", sets: "3 sets x 12 reps", isFocus: targets.includes('CHEST') },
          { name: "Overhead Dumbbell Press", sets: "3 sets x 10 reps", isFocus: targets.includes('DELTS') },
          { name: "Tricep Pushdowns", sets: "3 sets x 12 reps", isFocus: targets.includes('ARMS') }
        ]
      },
      {
        name: "DAY 02 // PULL OVERLOAD",
        type: "LATS, RHOMBOIDS, BICEPS",
        exercises: [
          { name: safeRow, sets: "4 sets x 8 reps", isFocus: targets.includes('LATS') },
          { name: "Lat Pulldown Wide Grip", sets: "3 sets x 10 reps", isFocus: targets.includes('LATS') },
          { name: safeArm, sets: "3 sets x 10 reps", isFocus: targets.includes('ARMS') },
          { name: "Face Pulls", sets: "3 sets x 15 reps", isFocus: targets.includes('DELTS') }
        ]
      },
      {
        name: "DAY 03 // LEGS & CORE",
        type: "QUADS, POSTERIOR & ABS",
        exercises: [
          { name: safeSquat, sets: "4 sets x 8-10 reps", isFocus: targets.includes('QUADS') },
          { name: "Leg Extensions", sets: "3 sets x 12 reps", isFocus: targets.includes('QUADS') },
          { name: "Hamstring Curls", sets: "3 sets x 10 reps", isFocus: false },
          { name: "Ab Roller / Plank Drives", sets: "3 sets x 15 reps", isFocus: targets.includes('CORE') }
        ]
      },
      {
        name: "DAY 04 // TARGET NODE SPECIALIZATION",
        type: `PRIORITY FOCUS: ${targets.join(' + ')}`,
        exercises: targets.map(m => ({
          name: `${m} Hypertrophy Density Node`,
          sets: "4 sets x 10-12 reps",
          isFocus: true
        }))
      }
    ];
  }

  routineDays.forEach(day => {
    const card = document.createElement('div');
    card.className = "bg-surface-container-low/90 border border-outline-variant/40 rounded p-2 text-[10px]";
    
    let exercisesHtml = day.exercises.map(ex => `
      <div class="flex items-center justify-between py-0.5 border-b border-outline-variant/15 last:border-0">
        <div class="flex items-center gap-1.5 truncate">
          <span class="w-1.5 h-1.5 rounded-full ${ex.isFocus ? 'bg-primary-container shadow-[0_0_6px_rgba(255,204,0,0.8)]' : 'bg-outline'} shrink-0"></span>
          <span class="font-body text-on-surface truncate ${ex.isFocus ? 'text-primary font-semibold' : ''}">${ex.name}</span>
          ${ex.isFocus ? '<span class="font-hud text-[7px] text-surface-container-lowest font-bold px-1 bg-primary-container rounded">FOCUS</span>' : ''}
        </div>
        <span class="font-hud text-[9px] text-outline shrink-0 ml-1 font-medium">${ex.sets}</span>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="flex items-center justify-between pb-1 mb-1 border-b border-outline-variant/30">
        <span class="font-headline text-[11px] font-bold text-primary-container">${day.name}</span>
        <span class="font-hud text-[8px] text-outline uppercase">${day.type}</span>
      </div>
      <div class="space-y-0.5">
        ${exercisesHtml}
      </div>
    `;
    container.appendChild(card);
  });

  const safetyNote = document.getElementById('workout-safety-note');
  if (AppState.restrictions.size > 0) {
    safetyNote.textContent = `SAFETY REGRESSION ACTIVE: ${Array.from(AppState.restrictions).map(r => r.replace('_', ' ').toUpperCase()).join(' & ')} modified to joint-friendly variants.`;
  } else {
    safetyNote.textContent = "UNRESTRICTED: Standard Olympic barbell and axial loads authorized.";
  }
}

