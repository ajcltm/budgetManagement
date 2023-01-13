import unittest
from budgetManagement import requirement
from datetime import date

def create_rqm_data(amount):
    return {'rqmDate':date(2023,1,13), 'acc':'dongi', 'payDate':date(2022,12,31), 'dsc':"wash", 'amt':amount}

class Test(unittest.TestCase):

    def test_rqm(self):
        for i in range(5, 9):
            r = create_rqm_data(30000+i)
            requirement.insert_rqm(**r)

    def test_update_rqm(self):
        r = {'rqmDate':date(2023,1,5), 'acc':'dongi', 'payDate':date(2022,12,31), 'dsc':"wash", 'amt':50_000}
        id = 'ac79f68f-6bab-48ec-ace4-ed4f3118b840'
        requirement.update_rqm(id=id,**r)

if __name__ == '__main__':
    unittest.main()
