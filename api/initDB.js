const WorkoutsDB = require('./models/workouts.js');
const UsersDB = require ('./models/users.js')

const Workouts = WorkoutsDB.getModel();
const Users = UsersDB.getModel();

(async() => {

	await Workouts.deleteMany({});
    await Users.deleteMany({});

	let workouts1 = new Workouts({
		name:'Upper Body 1', 
        description:
            'A1: Hip Thrusts. 3 sets, 12/10/8 reps. '+
            'A2: Leg  Press. 3 sets, 12 reps. '+
            'B1: Horizontal Back Extensions. 3 sets, 15-20 reps. '+
            'B2: Ring Pushups. 5 sets, 5 reps. '+
            'C1: High Incline DB Press. 3 sets, 6-8 reps. '+
            'C2: Machine Shoulder Raise. 3 sets, 10-12 reps. '+
            'D1: Cross Body Extensions. 3 sets, 15/12/10 reps. '+
            'D2: Garhammer Raise. 3 sets, 15-20 reps.'
	}); 

	let workouts2 = new Workouts({
		name:'Upper Body 2',
        description:
            'A1: Cross Body Extensions. 3 sets, 15/12/10 reps. '+
            'A2: Garhammer Raise. 3 sets, 15-20 reps. '+
            'B1: Hip Thrusts. 3 sets, 12/10/8 reps. '+
            'B2: Leg  Press. 3 sets, 12 reps. '+
            'C1: Horizontal Back Extensions. 3 sets, 15-20 reps. '+
            'C2: Ring Pushups. 5 sets, 5 reps. '+
            'D1: High Incline DB Press. 3 sets, 6-8 reps. '+
            'D2: Machine Shoulder Raise. 3 sets, 10-12 reps.'
	}); 

	let workouts3 = new Workouts({
		name:'Upper Body 3',
        description:
            'A1: High Incline DB Press. 3 sets, 6-8 reps. '+
            'A2: Machine Shoulder Raise. 3 sets, 10-12 reps. '+
            'B1: Cross Body Extensions. 3 sets, 15/12/10 reps. '+
            'B2: Garhammer Raise. 3 sets, 15-20 reps. '+
            'C1: Hip Thrusts. 3 sets, 12/10/8 reps. '+
            'C2: Leg  Press. 3 sets, 12 reps. '+
            'D1: Horizontal Back Extensions. 3 sets, 15-20 reps. '+
            'D2: Ring Pushups. 5 sets, 5 reps.'
	}); 

    let user1 = new Users({
		username:'ShelbyGoudy', 
        password: 'password',
        role: 'customer'
	}); 

	let user2 = new Users({
		username:'user', 
        password: 'user',
        role: 'customer'
	}); 

    let user3 = new Users({
		username:'admin', 
        password:'admin',
        role: 'admin'
	}); 


	await Promise.all([
			workouts1.save(), 
			workouts2.save(), 
			workouts3.save(),
            user1.save(),
            user2.save(),
            user3.save()
		]);

	process.exit();

})();












