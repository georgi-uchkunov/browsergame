/**
 * 
 */
package st.pro.browsergame.rest;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import st.pro.browsergame.models.Mission;
import st.pro.browsergame.models.Training;
import st.pro.browsergame.models.User;
import st.pro.browsergame.repos.MissionRepository;

/**
 * RestController, which uses functionalities from the {@link MissionRepository}
 * to create various methods handling specific CRUD operations on the
 * {@link Mission} entity. Receives AJAX requests from the client, directed
 * based on GetMapping and PostMapping
 * 
 * @author GU
 *
 */
@RestController
public class MissionRest {

	private MissionRepository missionRepo;

	@Autowired
	public MissionRest(MissionRepository missionRepo) {
		this.missionRepo = missionRepo;
	}

	/**
	 * Creates a new {@link Mission} with a timesChosen of 0
	 * 
	 * @param title, image, description, cost in crystal, reward in gold and guild
	 *               points, difficulty, two stats, two skills, required time for
	 *               the hero.
	 */
	@PostMapping(value = "/createMission")
	public Mission createMission(@RequestParam(name = "title") String title,
			@RequestParam(name = "crystalCost") int crystalCost, @RequestParam(name = "rewardGold") int rewardGold,
			@RequestParam(name = "rewardGuildPoints") int rewardGuildPoints,
			@RequestParam(name = "description") String description, @RequestParam(name = "missionTime") int missionTime,
			@RequestParam(name = "statOne") String statOne, @RequestParam(name = "statTwo") String statTwo,
			@RequestParam(name = "skillOne") String skillOne, @RequestParam(name = "skillTwo") String skillTwo,
			@RequestParam(name = "difficulty") String difficulty, @RequestParam(name = "image") String image) {
		final Mission newMission = new Mission(title, crystalCost, rewardGold, rewardGuildPoints, description,
				missionTime, statOne, statTwo, skillOne, skillTwo, difficulty, image);
		return missionRepo.saveAndFlush(newMission);
	}

	/**
	 * @param none
	 * @return Every existing {@link Mission}
	 *
	 */
	@GetMapping("/getAllMissions")
	public Page<Mission> getAllMissions(Pageable pageable) {
		return missionRepo.findAll(pageable);
	}

	/**
	 * Updates the parameters of an existing {@link Mission} with this id
	 * 
	 * @param Mission id, every other Mission parameter is optional, but returns
	 *                default value for type unless specified in request
	 *
	 */
	@PostMapping(value = "/updateMission")
	public Mission updateMission(Mission missionForUpdate) {

		return missionRepo.saveAndFlush(missionForUpdate);
	}

	/**
	 * Updates the parameters of an existing {@link Mission} with this id without
	 * affecting timesChosen
	 * 
	 * @param id, title, image, description, cost in crystal, reward in gold and
	 *            guild points, difficulty, two stats, two skills, required time for
	 *            the hero
	 */
	@PostMapping(value = "/updateMissionSansTimesChosen")
	public Mission updateMissionSansTimesChosen(@RequestParam(name = "id") int id,
			@RequestParam(name = "title") String title, @RequestParam(name = "crystalCost") int crystalCost,
			@RequestParam(name = "rewardGold") int rewardGold,
			@RequestParam(name = "rewardGuildPoints") int rewardGuildPoints,
			@RequestParam(name = "description") String description, @RequestParam(name = "missionTime") int missionTime,
			@RequestParam(name = "statOne") String statOne, @RequestParam(name = "statTwo") String statTwo,
			@RequestParam(name = "skillOne") String skillOne, @RequestParam(name = "skillTwo") String skillTwo,
			@RequestParam(name = "difficulty") String difficulty, @RequestParam(name = "image") String image) {
		Optional<Mission> missionForUpdate = missionRepo.findById(id);
		if (missionForUpdate.isPresent()) {
			Mission realMissionForUpdate = missionForUpdate.get();
			realMissionForUpdate.setTitle(title);
			realMissionForUpdate.setCrystalCost(crystalCost);
			realMissionForUpdate.setRewardGold(rewardGold);
			realMissionForUpdate.setDescription(description);
			realMissionForUpdate.setMissionTime(missionTime);
			realMissionForUpdate.setStatOne(statOne);
			realMissionForUpdate.setStatTwo(statTwo);
			realMissionForUpdate.setSkillOne(skillOne);
			realMissionForUpdate.setSkillTwo(skillTwo);
			realMissionForUpdate.setDifficulty(difficulty);
			realMissionForUpdate.setImage(image);
			return missionRepo.saveAndFlush(realMissionForUpdate);
		}
		return null;
	}

	/**
	 * @param id
	 * 
	 * @return Specific {@link Mission} with this id
	 *
	 */
	@GetMapping(value = "/getSelectedMissionById")
	public Mission getSelectedMissionById(@RequestParam(name = "id") int id) {
		List<Mission> missions = missionRepo.findAll();
		for (int i = 0; i < missions.size(); i++) {
			Mission currentMission = missions.get(i);
			if (currentMission.getId() == id) {
				return currentMission;
			}

		}
		return null;
	}

	/**
	 * Increments the times chosen of a specific {@link Mission} with this id with +1
	 * 
	 * @param id
	 */
	@PostMapping(value = "/updateMissionTimesChosen")
	public Mission updateMissionTimesChosen(@RequestParam(name = "id") int id) {
		Optional<Mission> missionForUpdate = missionRepo.findById(id);
		if (missionForUpdate.isPresent()) {
			Mission realMissionForUpdate = missionForUpdate.get();
			realMissionForUpdate.setTimesChosen((realMissionForUpdate.getTimesChosen() + 1));
			return missionRepo.saveAndFlush(realMissionForUpdate);
		}
		return null;

	}

	/**
	 * Deletes a specific {@link Mission} with this id
	 * 
	 * @param id
	 * 
	 */
	@PostMapping("/deleteMission")
	public ResponseEntity<String> deleteMission(@RequestParam(name = "id") int id, HttpSession session) {
		List<st.pro.browsergame.models.Mission> missions = missionRepo.findAll();
		Mission missionForDelete = missions.stream().filter(mission -> id == mission.getId()).findFirst().orElse(null);
		if (null != missionForDelete) {
			missions.remove(missionForDelete);
			missionRepo.deleteById(missionForDelete.getId());
		}
		return ResponseEntity.ok().body("Mission with id " + id + " has been deleted");
	}

}