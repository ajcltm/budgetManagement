from budgetManagement import config
import Isql

protocol = f'sqlite://database?{config.dir_db}'
engine = Isql.create_engine(protocol=protocol)
sql = engine.get_sql()
connector = engine.get_connector()

if __name__ == '__main__':
    print(sql)
    print(connector)